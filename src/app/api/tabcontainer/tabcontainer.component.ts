import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'tabcontainer',
  templateUrl: './tabcontainer.component.html',
  styleUrls: ['./tabcontainer.component.scss']
})
export class TabcontainerComponent implements OnInit {


  @Input('option') option: any[];
  @Output() requestUpdated = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  addOption(index) {
    if (index === this.option.length - 1) {
      this.option.push({} as any);
    }
  }

  removeOption(i) {
    if (this.option.length > i && !this.option[i].key &&
      !this.option[i].value && !this.option[i].description && i !== this.option.length - 1) {
      this.option.splice(i, 1);

    }
  }
  close(i) {
    if (this.option.length > i && this.option.length - 1 !== i) {
      this.option.splice(i, 1);
    }
  }

  triggermagic() {
    this.requestUpdated.emit(this.option);

  }


}
