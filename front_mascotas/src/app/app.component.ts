import { Component, ViewChild } from '@angular/core';
import { Mascota } from './models/mascota';
import { MascotaService } from './services/mascota.service';
import Swal from 'sweetalert2'; 

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  @ViewChild("buttonClose") buttonClose: any 

  mascota: Mascota = new Mascota();
  datatable: any =[];
  editarMascota : boolean = false;


  visible : boolean = false;
  constructor (private mascotaService:MascotaService){

  }

  ngOnInit():void{
    this.onDataTable();
  }

  onDataTable(){
    this.mascotaService.getMascota().subscribe(res =>{
      this.datatable = res;
      console.log(this.datatable);
    });
  }

  onAddMascota(mascota:Mascota):void{
    this.mascotaService.addMascota(mascota).subscribe(res =>{
      if (res) {
        //alert(`la mascota ${mascota.nombre} se ha registrado con exito`);
        Swal.fire('Notificación', `la mascota ${mascota.nombre} se ha registrado con exito`, 'success') 
        this.clear();
        this.onDataTable();
        this.visible = false;
        
      }else{
        Swal.fire('Notificación', 'No se pudo Ingresar la mascota', 'warning')
      }
    });
  }

  onUpdateMascota(mascota:Mascota):void{
    this.mascotaService.updateMascota(mascota.id,mascota).subscribe(res =>{
      if (res) {
        Swal.fire('Notificación', `la mascota numero ${mascota.id} se ha Actualizado con exito`, 'success') 
        this.clear();
        this.onDataTable();
        this.visible = false;
      }else{
        Swal.fire('Notificación', 'No se pudo Actualizar la mascota', 'warning')
      }
    });
  }

ondeleteMascota(id:number):void{
  this.mascotaService.deleteMascota(id).subscribe(res =>{
    if (res) {
 
      Swal.fire('Notificación',`la mascota numero ${id} se ha Actualizado con exito`, 'success') 
      this.clear();
      this.onDataTable();
    }else{
      Swal.fire('Notificación', 'No se pudo Eliminar la mascota', 'warning')
      
    }
  });

}

  onSetData(select:any){
    this.mascota.id = select.idMascota;
    this.mascota.nombre = select.nombre;
    this.mascota.edad = select.edad;
    this.mascota.descripcion = select.descripcion;
  }
 
  clear(){
    this.mascota.id = 0;
    this.mascota.nombre = "";
    this.mascota.edad = 0;
    this.mascota.descripcion = "";
  }

  showDialog(){
    this.editarMascota = false;
    this.visible = true;
  }

  cerrarDialog(){
    this.visible = false;
  }

  editar(mascotaEditar : any){
      this.editarMascota = true;
      this.visible = true;
      this.mascota.id = mascotaEditar.idMascota
      this.mascota.nombre = mascotaEditar.nombre
      this.mascota.edad = mascotaEditar.edad
      this.mascota.descripcion = mascotaEditar.descripcion
  }
}
