import { AfterViewInit, Component, OnInit, Input } from '@angular/core';
import { Image } from 'src/app/core/models/images/image';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements AfterViewInit, OnInit {
  @Input() card: Image;
  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {}
}
