import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  public categoryForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<CategoriesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.categoryForm = new FormGroup({
      category: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }
  onSubmit() {
    this.dialogRef.close(this.data.find(x => x.id === this.categoryForm.value.category));
  }

}
