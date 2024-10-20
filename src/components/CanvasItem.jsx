function Item({ url, scale, ...props }) {
    const visible = useRef(false);
    const [hovered, hover] = useState(false);
    const ref = useIntersect((isVisible) => (visible.current = isVisible));
    const { height } = useThree((state) => state.viewport);
    useFrame((state, delta) => {
      ref.current.position.y = THREE.MathUtils.damp(
        ref.current.position.y,
        visible.current ? 0 : -height / 2 + 1,
        4,
        delta
      );
      ref.current.material.zoom = THREE.MathUtils.damp(
        ref.current.material.zoom,
        visible.current ? 1 : 1.5,
        4,
        delta
      );
      ref.current.material.grayscale = THREE.MathUtils.damp(
        ref.current.material.grayscale,
        hovered ? 1 : 0,
        4,
        delta
      );
    });
    return (
      <group {...props} renderOrder={3}>
        <Image
          ref={ref}
          onPointerOver={() => hover(true)}
          onPointerOut={() => hover(false)}
          scale={scale}
          url={url}
        />
      </group>
    );
  }
  



        {/*  <Item
        url="/images/1.jpg"
        scale={[w / 3, w / 3, 1]}
        position={[-w / 6, -h, 0]}
      />*/}