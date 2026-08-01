import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setAllTimeline, setCharTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      const loadModelFromUrl = (url: string) =>
        new Promise<GLTF>((resolveGltf, rejectGltf) => {
          loader.load(
            url,
            async (gltf) => {
              const character = gltf.scene;
              await renderer.compileAsync(character, camera, scene);
              character.traverse((child: any) => {
                if (child.isMesh) {
                  const mesh = child as THREE.Mesh;

                  if (mesh.material) {
                    if (mesh.name === "BODY.SHIRT") {
                      const newMat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
                      newMat.color = new THREE.Color("#8B4513");
                      mesh.material = newMat;
                    } else if (mesh.name === "Pant") {
                      const newMat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
                      newMat.color = new THREE.Color("#000000");
                      mesh.material = newMat;
                    }
                  }

                  child.castShadow = true;
                  child.receiveShadow = true;
                  mesh.frustumCulled = true;
                }
              });

              resolveGltf(gltf);
              setCharTimeline(character, camera);
              setAllTimeline();
              character.getObjectByName("footR")!.position.y = 3.36;
              character.getObjectByName("footL")!.position.y = 3.36;
              dracoLoader.dispose();
            },
            undefined,
            (error) => rejectGltf(error)
          );
        });

      try {
        try {
          const encryptedBlob = await decryptFile(
            "/models/character.enc?v=2",
            "Character3D#@"
          );
          const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));
          const gltf = await loadModelFromUrl(blobUrl);
          resolve(gltf);
          return;
        } catch (decryptError) {
          console.warn("Encrypted model unavailable; trying raw GLB fallback.", decryptError);
        }

        try {
          const gltf = await loadModelFromUrl("/models/character.glb");
          resolve(gltf);
          return;
        } catch (rawError) {
          console.error("No valid 3D model asset was found.", rawError);
          resolve(null);
          return;
        }
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
