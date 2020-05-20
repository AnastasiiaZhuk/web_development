import React, {Component} from 'react';
import Carousel, {Dots} from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

export default class MyCarousel extends Component{
    constructor(props){
        super(props)
        this.state = {
            value: 0,
        };
    }
    onchange = value => this.setState({value});

  
    render(){
        return(
            <div>
            <Carousel
                arrows
                value={this.state.value}
                      onChange={this.onchange}

            infinite>
                <img src="http://images.wallpaperscraft.ru/image/zvezdnoe_nebo_oblaka_zakat_120716_800x600.jpg" alt='photo'/>
                <img src="http://images.wallpaperscraft.ru/image/zvezdnoe_nebo_vselennaya_galaktika_118232_800x600.jpg" alt='photo'/>
                <img src="http://images.wallpaperscraft.ru/image/zvezdnoe_nebo_bordovyj_zvexdy_114189_800x600.jpg" alt='photo'/>

            </Carousel>
            <Dots
                value={this.state.value}
                onChange={this.onchange}
                thumbnails={[
                      (<img key={1} style={{height: 80, width: 80}}  src="http://images.wallpaperscraft.ru/image/zvezdnoe_nebo_oblaka_zakat_120716_800x600.jpg" alt='photo'/>),
                      (<img key={2} style={{height: 80, width:80}}  src="http://images.wallpaperscraft.ru/image/zvezdnoe_nebo_vselennaya_galaktika_118232_800x600.jpg" alt='photo'/>),
                      (<img key={3} style={{height: 80, width:80}} src="http://images.wallpaperscraft.ru/image/zvezdnoe_nebo_bordovyj_zvexdy_114189_800x600.jpg" alt='photo'/>)  ,
                ]}
                />
            </div>
        );
    }
}

