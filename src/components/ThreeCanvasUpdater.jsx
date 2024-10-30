import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { useDispatch } from 'react-redux';
import { setThreeData } from '../redux/threeSlice';

const ThreeCanvasUpdater = () => {
  const { viewport, size, camera } = useThree();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setThreeData({ viewport, size, camera }));
  }, [viewport, size, camera, dispatch]);

  return null;
};

export default ThreeCanvasUpdater;