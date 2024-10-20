import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { useDispatch } from 'react-redux';
import { setThreeData } from '../redux/threeSlice';

const ThreeCanvasUpdater = () => {
  const { viewport, size, camera } = useThree();
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch the updated Three.js data to the Redux store
    dispatch(setThreeData({ viewport, size, camera }));
  }, [viewport, size, camera, dispatch]);

  return null; // This component doesn't render anything
};

export default ThreeCanvasUpdater;