import { Trail, Float, Stars, PresentationControls } from "@react-three/drei"
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import GoogleMap from "modules/landing-page/GoogleMap"
import { getPageLayout } from "modules/layouts/PageLayout"
import { GetStaticPropsContext } from "next"
import { useMemo, useRef } from "react"
import * as THREE from "three"
import { inferSSRProps } from "types/inferSSRProps"

// import { ssgInit } from "server/lib/ssg"

function Home({}: inferSSRProps<typeof getStaticProps>) {
    return (
        <div className="relative min-h-screen w-full">
            <Canvas camera={{ position: [0, 0, 10] }} style={{ position: "absolute" }}>
                <color attach="background" args={["black"]} />
                <PresentationControls
                    snap={true}
                    global
                    polar={[-1, 1]}
                    azimuth={[-1, 1]}
                    config={{ mass: 2, tension: 170, friction: 46 }}>
                    <Float speed={4} rotationIntensity={1} floatIntensity={2}>
                        <Atom />
                        <Logo />
                    </Float>
                    <Stars saturation={5} count={1000} speed={1} />
                </PresentationControls>
                <EffectComposer>
                    <Bloom mipmapBlur luminanceThreshold={2} radius={0.7} />
                </EffectComposer>
            </Canvas>

            <GoogleMap />
        </div>
    )
}

function Atom(props: any) {
    // const points = useMemo(
    //     () => new THREE.EllipseCurve(0, 0, 3, 1.15, 0, 2 * Math.PI, false, 0).getPoints(100),
    //     []
    // )

    return (
        <group {...props}>
            <Electron position={[0, -1, 0.5]} speed={1.5} rotation={[0, 0, -0.3]} />
            <Electron position={[0, 0, 0.5]} speed={2} rotation={[0, 0, -0.2]} />
            <Electron position={[0, 1, 0.5]} speed={3} rotation={[0, 0, 0]} />
            <Electron position={[0, 2, 0.5]} speed={2} rotation={[0, 0, 0.4]} />
            <Electron position={[0, 2, 0.5]} speed={1.5} rotation={[0, 0, 0.2]} />
        </group>
    )
}

function Logo() {
    const texture = useLoader(THREE.TextureLoader, "/logos/cpmc.png")

    return (
        <group position={[0, 0, 0]}>
            <ambientLight color={"#fcc4c0"} />
            <mesh>
                <meshPhongMaterial map={texture} side={THREE.DoubleSide} depthWrite={false} transparent />
                <planeGeometry args={[6, 4]} />
            </mesh>
        </group>
    )
}

function Electron({ radius = 7, speed = 6, ...props }) {
    const ref = useRef<any>()

    useFrame((state) => {
        const t = state.clock.getElapsedTime() * speed

        ref.current.position.set(
            Math.sin(t) * radius,
            (Math.cos(t) * radius * Math.atan(t)) / Math.PI / 1.25,
            0
        )
    })

    return (
        <group {...props}>
            <Trail local width={2} length={1} color={new THREE.Color(4, 1, 1)} attenuation={(t) => t * t}>
                <mesh ref={ref}>
                    <sphereGeometry args={[0.25]} />
                    <meshBasicMaterial color={[10, 1, 1]} toneMapped={false} />
                </mesh>
            </Trail>
        </group>
    )
}

Home.getLayout = getPageLayout

export default Home

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
    // const ssr = await ssgInit(ctx)

    const props = {
        // trpcState: ssr.dehydrate(),
    }

    return {
        props: {
            ...props,
        },
    }
}
