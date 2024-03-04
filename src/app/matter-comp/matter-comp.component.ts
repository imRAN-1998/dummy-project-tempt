import { AfterViewInit, Component } from '@angular/core';
import { Engine, Runner, Render,Composites,Composite, World, Common, Mouse,Constraint, MouseConstraint, Bodies} from 'matter-js'

@Component({
  selector: 'app-matter-comp',
  standalone: true,
  imports: [],
  templateUrl: './matter-comp.component.html',
  styleUrl: './matter-comp.component.scss'
})
export class MatterCompComponent implements AfterViewInit{

  constructor(){}

  ngAfterViewInit(): void {
    console.log(Engine);
    this.initiateSprites();
  }
  initiateSprites(){
    const _Engine = Engine,
        _Render = Render,
        _Runner = Runner,
        _Composites = Composites,
        _Common = Common,
        _MouseConstraint = MouseConstraint,
        _Mouse = Mouse,
        _Composite = Composite,
        _Bodies = Bodies;

    // create engine
    let engine = _Engine.create(),
        world = engine.world;

        const matterBody : any = document.querySelector(".matter-body");
    // create renderer
    let render = _Render.create({
        element: matterBody,
        engine: engine,
        options: {
            width: window.innerWidth,
            height: window.innerHeight,
            showAngleIndicator: false,
            wireframes: false,
            background : 'transparent'
        }
    });

    _Render.run(render);

    // create runner
    let runner = _Runner.create();
    _Runner.run(runner, engine);

    // add bodies
    let offset = 100,
        options = { 
            isStatic: true,
            background: 'transparent'
        };

    world.bodies = [];

    // these static walls will not be rendered in this sprites example, see options
    _Composite.add(world, [
        // _Bodies.rectangle(400, -offset, 800.5 + 2 * offset, 50.5, options),
        _Bodies.rectangle(0, window.innerHeight + 100, (window.innerWidth) * 2 + ( 200), 10, {
          isStatic : true,
          render : {
            // fillStyle : 'transparent',
            // strokeStyle: 'blue',
          }
        }),
        _Bodies.rectangle(window.innerWidth+ 100, 0, 50.5, 600.5 + 2 * offset, {
          isStatic : true,
          render : {
            // fillStyle : 'transparent',
            // strokeStyle: 'blue',
          }
        }),
        _Bodies.rectangle(-offset, 300, 50.5, 600.5 + 2 * offset, {
          isStatic : true,
          render : {
            // fillStyle : 'transparent',
            // strokeStyle: 'blue',
          }
        })
    ]);

    let stack = _Composites.stack(20, 20, 10, 4, 0, 0, function(x:any, y : any) {
        if (_Common.random() > 0.35) {
            return _Bodies.rectangle(x, y, 64, 64, {
                render: {
                    strokeStyle: '#ffffff',
                    sprite: {
                        texture: 'assets/tempt_jpg.png',
                        xScale : 0.3,
                        yScale : 0.3
                    }
                }
            });
        } else {
            return _Bodies.circle(x, y, 46, {
                density: 0.0005,
                frictionAir: 0.06,
                restitution: 0.3,
                friction: 0.01,
                render: {
                    sprite: {
                        texture: 'assets/tempt_png.png',
                        xScale : 0.3,
                        yScale : 0.3
                    }
                }
            });
        }
    });

    _Composite.add(world, stack);

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
        max: { x: window.innerWidth +100, y: window.innerHeight + 100 }
    });

    // context for MatterTools.Demo
    return {
        engine: engine,
        runner: runner,
        render: render,
        canvas: render.canvas,
        stop: function() {
            Render.stop(render);
            Runner.stop(runner);
        }
    };
  }
}
