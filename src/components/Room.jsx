import React from 'react'
import { useGLTF, useVideoTexture } from '@react-three/drei' 
import { RigidBody } from '@react-three/rapier'

export default function Room(props) {
  const { nodes, materials } = useGLTF('/control_room_by_amogusstrikesback2/scene.gltf')
  
  const networkVideo = useVideoTexture('/videos/network.mp4')
  const isolatedVideo = useVideoTexture('/videos/isolated.mp4')

  return (
    <RigidBody type="fixed" colliders="trimesh">
      <group {...props} dispose={null}>
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
        <mesh geometry={nodes.Object_38.geometry} material={materials.IS4_P1_PuertaControl_4_IS4_TXT_P1_03_0_Baked} position={[1.242, 1.102, -2.572]} scale={0.01} />
        <mesh geometry={nodes.Object_40.geometry} material={materials.IS4_SalaControl_ArchivadorT2_1__1__SalaControl_Props_Mobile_0_B} position={[2.905, 1.249, -5.628]} scale={0.01} />
        <mesh geometry={nodes.Object_42.geometry} material={materials.IS4_SalaControl_Boton_Azul_SalaControl_Props_Mobile_0_Baked} position={[3.226, 0.923, -4.104]} scale={0.01} />
        <mesh geometry={nodes.Object_44.geometry} material={materials.IS4_SalaControl_LamparaTecho_2_SalaControl_Props_Mobile_0_Baked} position={[-1.48, 3.175, -3.992]} scale={0.01} />
        <mesh geometry={nodes.Object_46.geometry} material={materials.IS4_SalaControl_LamparaTecho_Luz_SalaControl_Props_Emision} position={[2.2, 2.513, -3.992]} scale={0.01} />
        <mesh geometry={nodes.Object_48.geometry} material={materials.IS4_SalaControl_MonitorT1_1__1__SalaControl_Props_Mobile_0_Bake} position={[3.721, 1.515, -4.132]} rotation={[0, 0.106, 0]} scale={0.01} />
        <mesh geometry={nodes.Object_50.geometry} material={materials.IS4_SalaControl_MonitorT2_1__3__SalaControl_Props_Mobile_0_Bake} position={[1.954, 0.049, -5.208]} rotation={[0, 0.806, 0]} scale={0.01} />
        
        {/* CHANNEL 2: The 7-Screen Network */}
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
        <mesh geometry={nodes.Object_72.geometry} material={materials.P1_Puerta_Granate__3__P1_02_mobile_0_Baked} position={[1.689, 0.064, -2.518]} scale={0.01} />
        
        {/* CHANNEL 1: The Isolated Screen */}
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
        <mesh geometry={nodes.Object_84.geometry} material={materials['IS4_MDL_SalaControl_PanelControl_SalaControl_Props_Mobile_0.001']} position={[3.314, 0.929, -4.796]} rotation={[0, 0.003, 0]} scale={0.01} />
      </group>
    </RigidBody>
  )
}

useGLTF.preload('/control_room_by_amogusstrikesback2/scene.gltf')