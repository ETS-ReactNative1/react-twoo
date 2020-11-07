import React, { Component } from 'react';
import WaterBeeldFilter from './WaterBeeldFilter'
import * as PIXI from 'pixi.js'
// import plot from 'plot';

//http://www.lafamiliaxsiempre.cl/lookbook
//http://super16.dk/medlemmer/glen-bay-grant
//https://gl-transitions.com/editor/directionalwarp?direction=-1,0
//https://gl-transitions.com/editor/crosswarp

// !!!!
//https://videohive.net/item/handy-seamless-transitions-pack-script/18967340?irgwc=1&clickid=0giS-aX0JQ2eUc10bqVBhWPIUkgzyHwI-QdBQs0&iradid=275988&irpid=1143794&iradtype=ONLINE_TRACKING_LINK&irmptype=mediapartner&mp_value1=&utm_campaign=af_impact_radius_1143794&utm_medium=affiliate&utm_source=impact_radius

var loader = PIXI.loader;


export default class ReactWaterBeeldFilter extends Component {
	constructor(props){
        super(props)
        this.handleMouse.bind(this)
        this.filter =  new WaterBeeldFilter()

	}
	componentWillMount(){
        window.addEventListener('mousemove',this.handleMouse)
    }
    
    t = 0
    handleMouse = (e)=>{

        // const {filter} = this;
        const progress = e.clientX/this.filter.uniforms.dimensions[0];
    
       // plot('mousex',this.t,(parabola*100))
        //plot('pasrabola',this.t,parabola*100,'#ffff00')
        this.filter.uniforms.progress = progress ;
        // this.filter.uniforms.parabola = parabola ;
        this.filter.uniforms.effectFactor = e.clientX/100;
        // this.filter.mouse =  [e.clientX/window.innerWidth,e.clientY/window.innerHeight];
    }
    _loader = []
    _loaderQue = [];
    add = (name,url,index) =>{
        const hasAsset = this._loader.find(x=>x.url === url) ? true : false;
        // console.log('add',url,name,hasAsset)//
        if(!hasAsset){
            if(!loader.isLoading) {
                this._loader.push({url,name,index}) 
                
                loader.add(url,url,index);
            }else{
                this._loaderQue.push({url,name,index}) 
            }
        }; 
    }
    handleError =  (error,loader)=>{
        console.log('handleError',error,loader);
        loader.isLoading = false;
        
   
    }   
    handleLoaded = (loader) =>{
        
        this._loader.forEach(({url,name,index})=>{
            console.log('handleLoaded',index)
            const resource = loader.resources[url];
            if(resource){
            const {texture} = resource;
            this.filter.addTexture(texture,name);
            }else{
                console.alert(`Texture does not exist: ${url}`)
            }
        })
      
    }
	update = (nextProps) =>{
	
        this.filter.offset =  nextProps.offset;
        if(nextProps.texture){
            loader = new PIXI.loaders.Loader();
            nextProps.texture.forEach((file,i) => {
                const name = Object.keys(file)[0];
                const url = file[name];
                 console.log('texture',name,url,i)
                this.add(name,url,i)
            });
        }

        loader.once('complete',()=>{
            loader.isLoading = false;
            if(this._loaderQue.length > 0){
                this._loaderQue.forEach(item=>this.add(item.name,item.url,item.index));
            }else{
               
            }



        });
        if(!loader.isLoading){
            loader.isLoading = true;
            loader.load((data)=>this.handleLoaded(data))
        }
       

    }
    componentWillReceiveProps(nextProps){
        console.log(nextProps)
        this.update(nextProps)
    }
	componentDidMount(){

        this.update(this.props);
        loader.on('error', this.handleError, this);
        // this.container.anchor.set(0.5);
	}
	componentWillUnmount(){
    }
    
    renderChidren(children){
        const filters = [...this.props.filters,this.filter]
       return React.Children.map(children, child =>  React.cloneElement(child,{...child.props,filters},child.props.children))
       
    }
    
  
   
    // render() {
	// 	return <div ref={ref=>this.container=ref}  filters={[this.filter]}>{this.props.children}</div>
    // }
    
	render() {
        return this.renderChidren(this.props.children)
	}
}

ReactWaterBeeldFilter.defaultProps = {
    pause:false,
    offset:0,
    filters:[0],
}