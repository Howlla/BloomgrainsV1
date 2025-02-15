import React, {Component} from 'react';
import {Path} from 'react-native-svg';
import * as shape from 'd3-shape';
const d3 = {shape};

export default class Slice extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.arcGenerator = d3.shape.arc()
            .outerRadius(100)
            .padAngle(0)
            .innerRadius(0);
    }

    createPieArc = (index, endAngle, data) => {

        const arcs = d3.shape.pie()
            .value((item)=>item.value)
            .startAngle(0)
            .endAngle(endAngle)
            (data);

        let arcData = arcs[index];

        return this.arcGenerator(arcData);
    };


    render() {

        const {
            endAngle,
            color,
            index,
            data,
            onPress
        } = this.props;
        let val = data[index].value;
        // console.log('here',val)

        return (
            <Path
                onPress={onPress}
                d={this.createPieArc(index, endAngle, data)}
                fill={color}
                stroke="black"
            />
        )

    }
}