import React, { useRef, useState } from 'react'
import { useGLTF, useVideoTexture, Html } from '@react-three/drei' 
import { RigidBody } from '@react-three/rapier'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three' 
import PortfolioOS from './PortfolioOS.jsx'

const doorLocation = new THREE.Vector3(1.68, 1, -1.8)
const doorTriggerRadius = 1.5

// 🔥 HINGE FIXED: Shifted to the true RIGHT edge of the door frame (X = 1.24)
const hingePosition = new THREE.Vector3(1.24, 0, -2.518)

export default function Room({ playerState, isUIOpen, closeUI, ...props }) {
  const { nodes, materials } = useGLTF('/control_room_by_amogusstrikesback2/scene.gltf')
  
  const networkVideo = useVideoTexture('/videos/network.mp4')
  const isolatedVideo = useVideoTexture('/videos/isolated.mp4') 

  const doorRigidBodyRef = useRef(null)
  const doorAngle = useRef(0)

  // Same near/prompt pattern as InteractiveChair/InteractiveSofa: a ref
  // for the keydown handler to read synchronously, plus state so the
  // Html prompt actually shows/hides.
  const [isNear, setIsNear] = useState(false)
  const isNearRef = useRef(false)

  // Open/closed toggled on E press — state (not a ref) so the prompt
  // text below actually updates, matching isSitting in chair/sofa.
  const [isDoorOpen, setIsDoorOpen] = useState(false)

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      // Same input guard as InteractiveChair, so typing "e" in the OS
      // search bar doesn't also toggle the door.
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
        return;
      }
      if (e.code === 'KeyE' && isNearRef.current) {
        setIsDoorOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useFrame(() => {
    // Proximity now measured from the character, same as chair/sofa —
    // no longer needs the old FPP/TPP-dependent trigger distance hack,
    // since playerState.position doesn't move when the TPP camera orbits.
    const distX = playerState.position.x - doorLocation.x
    const distZ = playerState.position.z - doorLocation.z
    const distance = Math.sqrt(distX * distX + distZ * distZ)

    const closeEnough = distance < doorTriggerRadius
    if (closeEnough !== isNearRef.current) {
      isNearRef.current = closeEnough
      setIsNear(closeEnough)
    }

    if (doorRigidBodyRef.current) {
      const targetAngle = isDoorOpen ? -Math.PI / 2 : 0

      // Smoothly animate the angle
      doorAngle.current = THREE.MathUtils.lerp(doorAngle.current, targetAngle, 0.1)

      const euler = new THREE.Euler(0, doorAngle.current, 0)
      const quaternion = new THREE.Quaternion().setFromEuler(euler)

      // Apply the rotation to the physical right-side hinge
      doorRigidBodyRef.current.setNextKinematicTranslation(hingePosition)
      doorRigidBodyRef.current.setNextKinematicRotation(quaternion)
    }
  })

  return (
    <>
      {/* 🛑 MAIN ROOM (FIXED PHYSICS) 🛑 */}
      <RigidBody type="fixed" colliders="trimesh">
        <group 
          {...props} 
          dispose={null}
          onPointerDown={(e) => {
            e.stopPropagation();
            console.log("🛑 HIT OBJECT:", e.object.material ? e.object.material.name : "Unknown");
            console.log(`📍 WALL/FLOOR COORDINATES: [${e.point.x.toFixed(3)}, ${e.point.y.toFixed(3)}, ${e.point.z.toFixed(3)}]`);
          }}
        >
          <mesh geometry={nodes.Object_4.geometry} material={materials.ControlRoom_Ceiling_P1_02_mobile_0_Baked} position={[23.981, -4.941, 8.461]} scale={0.01} />
          <mesh geometry={nodes.Object_6.geometry} material={materials.ControlRoom_Floor_P1_02_mobile_0_Baked} position={[23.981, -4.941, 8.461]} scale={0.01} />
          <mesh geometry={nodes.Object_8.geometry} material={materials.ControlRoom_FloorTrim_4_P1_01_mobile_0_Baked} position={[23.981, -4.941, 8.461]} scale={0.01} />
          <mesh geometry={nodes.Object_10.geometry} material={materials.ControlRoom_GreenTube_P1_02_mobile_0_Baked} position={[23.981, -4.941, 8.461]} scale={0.01} />
          <mesh geometry={nodes.Object_12.geometry} material={materials.ControlRoom_Pipe_3_P1_02_mobile_0_Baked} position={[23.981, -4.941, 8.461]} scale={0.01} />
          <mesh geometry={nodes.Object_14.geometry} material={materials.ControlRoom_Vent_P1_02_mobile_0_Baked} position={[-1.362, -0.741, -5.584]} scale={0.01} />
          <mesh geometry={nodes.Object_16.geometry} material={materials.ControlRoom_Wall_1_P1_01_mobile_0_Baked} position={[23.981, -4.941, 8.461]} scale={0.01} />
          <mesh geometry={nodes.Object_18.geometry} material={materials.ControlRoom_Wall_2_P1_01_mobile_0_Baked} position={[23.981, -4.941, 8.461]} scale={0.01} />
          <mesh geometry={nodes.Object_20.geometry} material={materials.ControlRoom_Wall_3_P1_01_mobile_0_Baked} position={[23.981, -4.941, 8.461]} scale={0.01} />
          <mesh geometry={nodes.Object_22.geometry} material={materials.ControlRoom_WallTrim_1_P1_01_mobile_0_Baked} position={[23.981, -4.941, 8.461]} scale={0.01} />
          <mesh geometry={nodes.Object_24.geometry} material={materials.IS4_MDL_SalaControl_CajaCarton__1__1_SalaControl_Props_Mobi} position={[-1.546, 0.068, -2.933]} rotation={[Math.PI, -1.434, Math.PI]} scale={0.01} />
          <mesh geometry={nodes.Object_26.geometry} material={materials.IS4_MDL_SalaControl_CajaCarton__1__SalaControl_Props_Mobile_0_B} position={[3.103, 0.424, -5.619]} rotation={[0, 1.422, 0]} scale={0.01} />
          <mesh geometry={nodes.Object_28.geometry} material={materials.IS4_MDL_SalaControl_Computadora_SalaControl_Props_Mobile_0_Bake} position={[3.759, 0.863, -4.836]} scale={0.01} />
          <mesh geometry={nodes.Object_30.geometry} material={materials.IS4_MDL_SalaControl_Estanteria_SalaControl_Props_Mobile_0_Baked} position={[2.794, 0.053, -5.64]} scale={0.01} />
          <mesh geometry={nodes.Object_32.geometry} material={materials.IS4_MDL_SalaControl_Interruptor_SalaControl_Props_Mobile_0_Bake} position={[0.835, 1.474, -2.647]} scale={0.01} />
          <mesh geometry={nodes.Object_34.geometry} material={materials.IS4_MDL_SalaControl_PanelControl_SalaControl_Props_Mobile_0_Bak} position={[3.314, 0.929, -4.796]} rotation={[0, 0.003, 0]} scale={0.01} />
          <mesh geometry={nodes.Object_36.geometry} material={materials.IS4_MDL_SalaControl_Sofa_SalaControl_Props_Mobile_0_Baked} position={[-0.742, 0.053, -5.626]} scale={0.01} />
          
          <mesh geometry={nodes.Object_40.geometry} material={materials.IS4_SalaControl_ArchivadorT2_1__1__SalaControl_Props_Mobile_0_B} position={[2.905, 1.249, -5.628]} scale={0.01} />
          <mesh geometry={nodes.Object_42.geometry} material={materials.IS4_SalaControl_Boton_Azul_SalaControl_Props_Mobile_0_Baked} position={[3.226, 0.923, -4.104]} scale={0.01} />
          <mesh geometry={nodes.Object_44.geometry} material={materials.IS4_SalaControl_LamparaTecho_2_SalaControl_Props_Mobile_0_Baked} position={[-1.48, 3.175, -3.992]} scale={0.01} />
          <mesh geometry={nodes.Object_46.geometry} material={materials.IS4_SalaControl_LamparaTecho_Luz_SalaControl_Props_Emision} position={[2.2, 2.513, -3.992]} scale={0.01} />
          <mesh geometry={nodes.Object_48.geometry} material={materials.IS4_SalaControl_MonitorT1_1__1__SalaControl_Props_Mobile_0_Bake} position={[3.721, 1.515, -4.132]} rotation={[0, 0.106, 0]} scale={0.01} />
          <mesh geometry={nodes.Object_50.geometry} material={materials.IS4_SalaControl_MonitorT2_1__3__SalaControl_Props_Mobile_0_Bake} position={[1.954, 0.049, -5.208]} rotation={[0, 0.806, 0]} scale={0.01} />
          
          <mesh 
            geometry={nodes.Object_52.geometry} 
            position={[3.706, 1.195, -3.981]} 
            rotation={[0, -0.019, 0]} 
            scale={0.01}
          >
            <meshBasicMaterial map={networkVideo} toneMapped={false} />
          </mesh>

          <mesh geometry={nodes.Object_54.geometry} material={materials.IS4_SalaControl_MonitorT3_1__1__SalaControl_Props_Mobile_0_Bake} position={[3.617, 0.862, -3.512]} rotation={[0, -0.258, 0]} scale={0.01} />
          <mesh geometry={nodes.Object_56.geometry} material={materials.IS4_SalaControl_MonitorT3_1_SalaControl_Props_Mobile_0_Baked} position={[3.689, 0.862, -3.977]} scale={0.009} />
          
          <mesh geometry={nodes.Object_58.geometry} material={materials.Item_Crowbar_IS8_TXT_Office_Props_Mobile_0_Baked} position={[-1.821, 0.895, -3.376]} rotation={[-Math.PI / 2, 0, 0]} scale={0.01} />
          <mesh geometry={nodes.Object_60.geometry} material={materials.Office_CubicleBoard_IS8_TXT_Office_Props_Mobile_0_Baked} position={[-1.659, 1.346, -2.623]} rotation={[-Math.PI, 0, -Math.PI]} scale={0.01} />
          <mesh geometry={nodes.Object_62.geometry} material={materials.Office_FilesCabinet_3_1_IS8_TXT_Office_Props_Mobile_0_Baked} position={[-0.5, 0.233, -2.914]} rotation={[-Math.PI, 0, -Math.PI]} scale={0.011} />
          <mesh geometry={nodes.Object_64.geometry} material={materials.Office_FilesCabinet_3_IS8_TXT_Office_Props_Mobile_0_Baked} position={[0, 0.233, -2.914]} rotation={[-Math.PI, 0, -Math.PI]} scale={0.011} />
          <mesh geometry={nodes.Object_66.geometry} material={materials.Office_FilesCabinet_IS8_TXT_Office_Props_Mobile_0_Baked} position={[0, 0.065, -2.884]} rotation={[-Math.PI, 0, -Math.PI]} scale={0.011} />
          <mesh geometry={nodes.Object_68.geometry} material={materials.OfficeChair_IS8_TXT_Office_Props_Mobile_0_Baked} position={[-2.107, 0.059, -4.029]} rotation={[-Math.PI, 1.137, -Math.PI]} scale={0.01} />
          <mesh geometry={nodes.Object_70.geometry} material={materials.OfficeWoodTable_IS8_TXT_Office_Props_Mobile_0_Baked} position={[-2.089, 0.059, -3.337]} rotation={[0, -Math.PI / 2, 0]} scale={[0.007, 0.01, 0.01]} />
          
          <mesh 
            geometry={nodes.Object_74.geometry} 
            position={[3.59, 1.723, -4.116]} 
            rotation={[-Math.PI, -0.081, -Math.PI]} 
            scale={0.01}
          >
            <meshBasicMaterial map={isolatedVideo} toneMapped={false} />
          </mesh>
          
          <mesh geometry={nodes.Object_76.geometry} material={materials.Telephone_telefono_mobile_0_Baked} position={[3.231, 0.868, -3.34]} rotation={[-Math.PI, 0, Math.PI]} scale={[-0.01, 0.01, 0.01]} />
          <mesh geometry={nodes.Object_78.geometry} material={materials.WhiteDesk_Drawer_2_IS8_TXT_ControlRoom_Props_Mobile_0_Baked} position={[3.294, 0.335, -3.328]} scale={0.01} />
          <mesh geometry={nodes.Object_80.geometry} material={materials.WhiteDesk_Drawer_5_IS8_TXT_ControlRoom_Props_Mobile_0_Baked} position={[3.294, 0.259, -4.741]} scale={0.01} />
          <mesh geometry={nodes.Object_82.geometry} material={materials.WhiteDesk_IS8_TXT_ControlRoom_Props_Mobile_0_Baked} position={[3.538, 0.053, -4.041]} scale={0.01} />
        </group>
      </RigidBody>

      {/* 🚀 THE ANIMATED DOOR (RIGHT HINGE) 🚀 */}
      {/* Changed colliders to "trimesh" to prevent convex hull bounding box issues */}
      <RigidBody type="kinematicPosition" ref={doorRigidBodyRef} colliders="trimesh" position={[1.24, 0, -2.518]}>
        {/* We offset the group by the exact negative of the RigidBody position to anchor the pivot */}
        <group position={[-1.24, 0, 2.518]}>
          <mesh geometry={nodes.Object_38.geometry} material={materials.IS4_P1_PuertaControl_4_IS4_TXT_P1_03_0_Baked} position={[1.242, 1.102, -2.572]} scale={0.01} />
          <mesh geometry={nodes.Object_72.geometry} material={materials.P1_Puerta_Granate__3__P1_02_mobile_0_Baked} position={[1.689, 0.064, -2.518]} scale={0.01} />
          <mesh geometry={nodes.Object_84.geometry} material={materials['IS4_MDL_SalaControl_PanelControl_SalaControl_Props_Mobile_0.001']} position={[3.314, 0.929, -4.796]} rotation={[0, 0.003, 0]} scale={0.01} />
        </group>
      </RigidBody>

      {/* Door interact prompt — anchored at the door's static world
          location, deliberately NOT nested inside the door's own
          swinging group, so it doesn't rotate along with the door. */}
      {isNear && (
        <Html center position={[doorLocation.x, doorLocation.y + 0.6, doorLocation.z]}>
          <div style={{
            background: 'rgba(0,0,0,0.8)',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '8px',
            border: '2px solid white',
            fontFamily: 'monospace',
            fontWeight: 'bold',
            pointerEvents: 'none',
            whiteSpace: 'nowrap'
          }}>
            {isDoorOpen ? '[E] Close Door' : '[E] Open Door'}
          </div>
        </Html>
      )}

      {/* ✅ THE LIVE OS */}
      <group position={[3.571, 1.371, -4.095]} rotation={[0, -0.02, 0]}>
        <Html
          transform
          rotation={[0, -Math.PI/2, 0]} 
          position={[1, 0, 0]} 
          scale={0.1} 
        >
          <div id="THE-MISSING-OS" style={{
            position: 'relative', 
            width: '1000px', 
            height: '750px',
            opacity: isUIOpen ? 1 : 0, 
            pointerEvents: isUIOpen ? 'auto' : 'none', 
            backgroundColor: isUIOpen ? '#0a0a0a' : 'transparent',
            transition: 'opacity 0.3s ease',
          }}>
            <PortfolioOS isUIOpen={true} closeUI={closeUI} /> 
          </div>
        </Html>
      </group>
    </>
  )
}

useGLTF.preload('/control_room_by_amogusstrikesback2/scene.gltf')