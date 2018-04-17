import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { CardSection } from '../common';
import config from '../../config';

type Props = {
  data: Object
};

class ListItem extends Component<Props> {
   render() {
      const { image, title, description } = this.props.data;
      const { 
        titleStyle, 
        contentContainer,
        imageStyle,
        descriptionText
      } = styles;

      return (
        <View>
          <CardSection>
            <Text style={titleStyle}>
              {title}
            </Text>
            <View style={contentContainer}>
              <Image
                style={imageStyle}
                source={{ uri: `${config.apiUrl}/manual/${image}` }}
              />
              <Text style={descriptionText}>
                {description}
              </Text>
            </View>
          </CardSection>
        </View>
      );
   }
}

const styles = {
  titleStyle: {
    fontSize: 25,
    padding: 15
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageStyle: {
    width: 80, 
    height: 80
  },
  descriptionText: {
    paddingLeft: 15,
    paddingBottom: 15,
    width: '70%'
  }
};

export default ListItem;
