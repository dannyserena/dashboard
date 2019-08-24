import { IcecreamService } from './../icecream.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-register-icecream',
  templateUrl: './register-icecream.component.html',
  styleUrls: ['./register-icecream.component.css']
})
export class RegisterIcecreamComponent implements OnInit {

  title = 'Operações com Firestore para o Sorvetex';

  icecreams: any;
  icecreamName: string;
  icecreamCalories: number;
  icecreamDescription: string;

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );


constructor(private icecreamService: IcecreamService, 
            private breakpointObserver: BreakpointObserver) { }

  ngOnInit(){
    this.icecreamService.read_Icecreams().subscribe(data => {
      this.icecreams = data.map(e => {
        return{
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data()['Name'],
          Calories: e.payload.doc.data()['Calories'],
          Description: e.payload.doc.data()['Description'],
        };
      })
      console.log(this.icecreams);
    });
  }
  CreateRecord(){
    let record = {};
    record['Name'] = this.icecreamName;
    record['Calories'] = this.icecreamCalories;
    record['Description'] = this.icecreamDescription;
    this.icecreamService.create_NewIcecream(record).then(resp => {
      this.icecreamName="";
      this.icecreamCalories= undefined;
      this.icecreamDescription = "";
      console.log(resp);
    })
    .catch(error => {
      console.log(error);
    });
  }
  RemoveRecord(rowID) {
      this.icecreamService.delete_Icecream(rowID);
  }
  EditRecord(record){
    record.isEdit = true;
    record.EditName = record.Name;
    record.EditCalories = record.Calories;
    record.EditDescription = record.Description;
  }
  UpdateRecord(recordRow){
    let record = {};
    record['Name']=recordRow.EditName;
    record['Calories']= recordRow.EditCalories;
    record['Description']= recordRow.EditDescription;
    this.icecreamService.update_Icecream(recordRow.id, record);
    recordRow.isEdit = false;
  }
}
