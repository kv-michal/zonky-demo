import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-average-loan',
  templateUrl: './average-loan.component.html',
  styleUrls: ['./average-loan.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AverageLoanComponent {
  @Input() loading: boolean = false;
  @Input() ratings: Rating[] = null;
  @Input() loans: Loan[] = null;
  @Output() onToggle: EventEmitter<string> = new EventEmitter<string>();

  toggleRating(rating: Rating) {
    this.onToggle.emit(rating.code)
  }
}
