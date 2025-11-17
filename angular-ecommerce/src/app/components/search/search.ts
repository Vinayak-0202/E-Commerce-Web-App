import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '../../../../node_modules/@angular/core/index';

@Component({
  selector: 'app-search',
  templateUrl: './search.html',
  styleUrl: './search.css',
  standalone: false,
})
export class Search implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  doSearch(value: string) {
    console.log(`value=${value}`);
    this.router.navigateByUrl(`/search/${value}`);
  }
}
