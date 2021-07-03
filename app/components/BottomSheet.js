import RBSheet from 'react-native-raw-bottom-sheet';
import React, {forwardRef, useImperativeHandle} from 'react';
import colors from '../constants/colors';

const BottomSheet = forwardRef((props, ref) => {
  const {children, height} = props;

  const refRBSheet = React.createRef();

  const containerStyle = {
    wrapper: {
      backgroundColor: colors.lightGrey,
    },
    draggableIcon: {
      width: 0,
    },
  };

  useImperativeHandle(ref, () => ({
    openSheet: () => refRBSheet.current.open(),
    closeSheet: () => refRBSheet.current.close(),
  }));

  return (
    <RBSheet
      height={height}
      ref={refRBSheet}
      closeOnDragDown={true}
      closeOnPressMask={true}
      dragFromTopOnly={true}
      customStyles={containerStyle}>
      {children}
    </RBSheet>
  );
});

export default BottomSheet;
