import Colors from 'material-ui/lib/styles/colors';
import ColorManipulator from 'material-ui/lib/utils/color-manipulator';
import Spacing from 'material-ui/lib/styles/spacing';

let harborColors = {
  darkblue: '#3A6E9A',
  lightblue: '#3DCCDB',
  offwhite: '#F0F1F2',
  grey: '#223A50'
}
module.exports = {
  spacing: Spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: harborColors.darkblue,
    primary2Color: harborColors.darkblue,
    primary3Color: harborColors.darkblue,
    accent1Color: harborColors.lightblue,
    accent2Color: harborColors.lightblue,
    accent3Color: harborColors.lightblue,
    textColor: harborColors.grey,
    alternateTextColor: Colors.white,
    canvasColor: harborColors.offwhite,
    borderColor: Colors.grey300,
    disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3)
  }
};
