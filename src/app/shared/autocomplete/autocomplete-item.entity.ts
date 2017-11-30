import { Subject } from 'rxjs/Subject';

export interface AutocompleteItem {
  value: string;
  data: any;
  selected?: Subject<boolean>;
}
