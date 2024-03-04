import { AfterViewInit, Component } from '@angular/core';
import anime from 'animejs';
import { Engine, Runner, Render, Composites, Composite, Common, Mouse, MouseConstraint, Bodies, Vertices, Body } from 'matter-js'


@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent implements AfterViewInit {
  constructor() { }
  
  mobileView : number = 700;

  ngAfterViewInit(): void {
    this.initAnimeScripts();
    this.initMatterScripts();
  }
  initAnimeScripts(){
    if(!(window.innerWidth > this.mobileView)){
      document.querySelector(".anime-js")?.classList.add("mobile")
    }
    const lineDrawing = anime({
      targets: '#lineDrawing path',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeOutBounce',
      duration: 10000,
      // delay: function(el, i) { return i * 250 },
      direction: 'forwards',
      loop: false,
      autoplay : true,
      complete : function(d){
        console.log(d.completed);
      },
      begin : (d)=>{
        setTimeout(()=>{
          console.log("completed!!");
        },5000)
      }
    })
  }



  async initMatterScripts() {
    const _Engine = Engine,
      _Render = Render,
      _Runner = Runner,
      _Composites = Composites,
      _Common = Common,
      _MouseConstraint = MouseConstraint,
      _Mouse = Mouse,
      _Composite = Composite,
      _Bodies = Bodies;
    const mainContainer: any = document.querySelector(".main-container");


    // create engine
    let engine = _Engine.create(),
      world = engine.world;

    // create renderer
    let render = _Render.create({
      element: mainContainer,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        showAngleIndicator: false,
        wireframes: false,
        background: 'transparent'
      }
    });

    _Render.run(render);
    // create runner
    let runner = _Runner.create();
    _Runner.run(runner, engine);

    //clear if the world has any bodies earlier
    world.bodies = [];

    await this.createFallingElements(world);
    
    if(window.innerWidth > this.mobileView){
      //create-empty-glass
      _Composite.add(world, [
        _Bodies.rectangle((window.innerWidth ) - 200, (window.innerHeight) - 100, (150), 1, { isStatic: true, render: { visible: false } }),
        _Bodies.rectangle((window.innerWidth ) -275, (window.innerHeight) - 185, 1, 200, { isStatic: true, render: { visible: false }, angle: -85 }),
        _Bodies.rectangle((window.innerWidth ) -125, (window.innerHeight) - 185, 1, 200, { isStatic: true, render: { visible: false }, angle: 85 }),
      ]);
    }else{
      //mobile view...
      if(document.querySelector(".empty-glass")){
        document.querySelector(".empty-glass")?.classList.add("mobile");
      }
      // .style.class
      _Composite.add(world, [
        _Bodies.rectangle((window.innerWidth / 2), (window.innerHeight) - 15, (150), 1, { isStatic: true, render: { visible: false } }),
        _Bodies.rectangle((window.innerWidth / 2) - 75, (window.innerHeight) - 100, 1, 200, { isStatic: true, render: { visible: false }, angle: -85 }),
        _Bodies.rectangle((window.innerWidth / 2) + 85, (window.innerHeight) - 100, 1, 200, { isStatic: true, render: { visible: false }, angle: 85 }),
      ]);
    }




    if (typeof window !== 'undefined') {
      var  updateGravity = function(event : any) {
          var orientation = typeof window.orientation !== 'undefined' ? window.orientation : 0,
              gravity = engine.gravity;

          if (orientation === 0) {
              gravity.x = Common.clamp(event.gamma, -90, 90) / 90;
              gravity.y = Common.clamp(event.beta, -90, 90) / 90;
          } else if (orientation === 180) {
              gravity.x = Common.clamp(event.gamma, -90, 90) / 90;
              gravity.y = Common.clamp(-event.beta, -90, 90) / 90;
          } else if (orientation === 90) {
              gravity.x = Common.clamp(event.beta, -90, 90) / 90;
              gravity.y = Common.clamp(-event.gamma, -90, 90) / 90;
          } else if (orientation === -90) {
              gravity.x = Common.clamp(-event.beta, -90, 90) / 90;
              gravity.y = Common.clamp(event.gamma, -90, 90) / 90;
          }
      };
      if(!(window.innerWidth > this.mobileView)){
        window.addEventListener('deviceorientation', updateGravity);
      }
  }






    // add mouse control
    let mouse = _Mouse.create(render.canvas),
      mouseConstraint = _MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.5,
          render: {
            visible: false
          }
        }
      });

    _Composite.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    _Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: window.innerWidth + 10, y: window.innerHeight + 0 }
    });

    // context for MatterTools.Demo
    return {
      engine: engine,
      runner: runner,
      render: render,
      canvas: render.canvas,
      stop: function () {
        Render.stop(render);
        Runner.stop(runner);
        if (typeof window !== 'undefined') {
          window.removeEventListener('deviceorientation', updateGravity);
      }
      }
    };


  }

  async createFallingElements(world : Matter.World){
    let redCategory = 0x0002;
    let yellowCategory  = 0x0004;
    //create choco_cubes
    const cubes : any = [
      Bodies.rectangle((window.innerWidth / 2), window.innerHeight/2, (50), 50,
        {
          mass : 0.1,
          collisionFilter : { category : yellowCategory},
          render:
          {
            sprite : {
              texture : 'assets/choco_cube_2.png',
              xScale : 0.45,
              yScale : 0.45
            }
          }
        }),
        Bodies.rectangle((window.innerWidth / 2)-50, window.innerHeight/2, (50), 50,
        {
          mass : 0.1,
          collisionFilter : { category : yellowCategory},
          render:
          {
            sprite : {
              texture : 'assets/choco_cube_2.png',
              xScale : 0.45,
              yScale : 0.45
            }
          }
        }),
        Bodies.rectangle((window.innerWidth / 2)+2, window.innerHeight/2, (50), 50,
        {
          mass : 0.1,
          collisionFilter : { category : yellowCategory},
          render:
          {
            sprite : {
              texture : 'assets/choco_cube_2.png',
              xScale : 0.45,
              yScale : 0.45
            }
          }
        }),
        Bodies.rectangle((window.innerWidth / 2), window.innerHeight/2, (50), 50,
        {
          mass : 0.1,
          collisionFilter : { category : yellowCategory},
          render:
          {
            sprite : {
              texture : 'assets/choco_cube_2.png',
              xScale : 0.45,
              yScale : 0.45
            }
          }
        })
    ];
    // Composite.add(world, cubes)
    // await this.waitTime(100);
    this.createChocoChips(world);

    // setInterval(()=>{
    //   this.createChocoChips(world);

    // },2000)
  }

  async createChocoChips(world : Matter.World){
    let tempV = window.innerWidth - 250;
    if(!(window.innerWidth > this.mobileView)){
      tempV = (window.innerWidth / 2) - 50;
    }

    let stack1 = Composites.stack((tempV), -500, 7, 5, 1, 1, function (x: number, y: number){
      // await this.waitTime();
      return Bodies.circle(x, y, 10, { frictionAir : 0.0001, friction: 0.8, restitution: 0.1, density: 0.001, render: { sprite: { texture: 'assets/choco_chip.png', xScale: 0.07, yScale: 0.07 } } });
    });
    Composite.add(world, stack1);
    await this.waitTime(10);
    let stack2 = Composites.stack(tempV, -500, 7, 5, 1, 1, function (x: number, y: number){
      // await this.waitTime();
      return Bodies.circle(x, y, 10, { frictionAir : 0.05, friction: 0.8, restitution: 0.1, density: 0.001, render: { sprite: { texture: 'assets/choco_chip.png', xScale: 0.07, yScale: 0.07 } } });
    });
    Composite.add(world, stack2);
    await this.waitTime(50);
    let stack3 = Composites.stack(tempV , -500, 7, 5, 1, 1, function (x: number, y: number){
      // await this.waitTime();
      return Bodies.circle(x, y, 10, { frictionAir : 0.03, friction: 0.8, restitution: 0.1, density: 0.001, render: { sprite: { texture: 'assets/choco_chip.png', xScale: 0.07, yScale: 0.07 } } });
    });
    Composite.add(world, stack3);
    await this.waitTime(200);
    let stack4 = Composites.stack(tempV , -500, 7, 10, 1, 1, function (x: number, y: number){
      // await this.waitTime();
      return Bodies.circle(x, y, 10, { frictionAir : 0.02, friction: 0.8, restitution: 0.1, density: 0.001, render: { sprite: { texture: 'assets/choco_chip.png', xScale: 0.07, yScale: 0.07 } } });
    });
    Composite.add(world, stack4);
    await this.waitTime(200);
    let stack5 = Composites.stack(tempV, -500, 7, 10, 1, 1, function (x: number, y: number){
      // await this.waitTime();
      return Bodies.circle(x, y, 10, { frictionAir : 0.02, friction: 0.8, restitution: 0.1, density: 0.001, render: { sprite: { texture: 'assets/choco_chip.png', xScale: 0.07, yScale: 0.07 } } });
    });
    Composite.add(world, stack5);
    await this.waitTime(200);
    let stack6 = Composites.stack(tempV , -500, 7, 10, 1, 1, function (x: number, y: number){
      // await this.waitTime();
      return Bodies.circle(x, y, 10, { frictionAir : 0.02, friction: 0.8, restitution: 0.1, density: 0.001, render: { sprite: { texture: 'assets/choco_chip.png', xScale: 0.07, yScale: 0.07 } } });
    });
    Composite.add(world, stack6);
  }

  async waitTime(time : number){
    return new Promise((res,rej)=>{
      setTimeout(()=>{res(true)},time);
    })
  }
}
