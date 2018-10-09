import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../model/Customer';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  settings: any = {
    deleteCustomerBtn: true
  };

  customers: Customer[];

  constructor(
    private cs: CustomerService,
    private fms: FlashMessagesService
  ) { }

  ngOnInit() {
    if( localStorage.getItem('settings') != null ){
      this.settings = JSON.parse( localStorage.getItem('settings') );
    } else {
      localStorage.setItem('settings', JSON.stringify( this.settings ));
    }
    this.cs.getCustomers().subscribe( customers => this.customers = customers );
  }

  onDelCustomer(id: string, event){
    event.preventDefault();
    if( confirm('Are you sure?') ){
      this.cs.deleteCustomer(id);
      this.fms.show('Customer removed', {
        cssClass: 'alert-success', timeout: 4000
      });
    }
  }

}
