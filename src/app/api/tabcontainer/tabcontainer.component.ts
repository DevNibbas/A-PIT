import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EnvparsePipe } from '../environment/envparse.pipe';
import { EnvService } from 'src/app/services/api/env.service';

@Component({
  selector: 'tabcontainer',
  templateUrl: './tabcontainer.component.html',
  styleUrls: ['./tabcontainer.component.scss']
})
export class TabcontainerComponent implements OnInit {


  @Input('option') option: any[];
  @Output() requestUpdated = new EventEmitter();
  constructor(private env: EnvService) { }

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

  parsedInput(i, t, e) {
    const envparser = new EnvparsePipe(this.env);
    envparser.transform(e.target.innerText).then(val => {
      this.option[i][t] = val;
    });


  }

  triggermagic() {

    this.requestUpdated.emit(this.option);

  }


}
