import React, { Component } from 'react';
import {
  ill0, ill1, ill2, ill3, ill4,
} from '../../../../assets/images/png';
import SliderCT from '../../../components/sliderCT';
import './styles.scss';

class Introduce extends Component {
  render() {
    return (
      <div className="introduce">
        <SliderCT
          imgs={[ill0, ill1, ill2, ill3, ill4]}
          descriptions={[
            'Improving lives by making the most accurate heart data available to everyone.',
            'Bioheart is the first of its kind - a continuous heart rhythm monitor for everyday use.',
            'Bioheart records your electrical heart activity continuously while you wear it, delivering the most accurate health insights on your heart.',
            'Your data is viewable live and saved in the app for you to review later.',
            'Easily export and share your data with a physician for a deeper understanding of your heart trends.',
          ]}
        />
      </div>
    );
  }
}

export default Introduce;
