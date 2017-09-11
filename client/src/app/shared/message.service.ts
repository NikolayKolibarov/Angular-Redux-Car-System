import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { MdSnackBar } from '@angular/material';

@Injectable()
export class MessageService {

    constructor(
        public snackBar: MdSnackBar
    ) {
    }

    showErrorMessage(message, duration = 3000): void {
        this.snackBar.open(message, 'X', {
            duration: duration,
        });
    }

    showSuccessMessage(message, duration = 3000): void {
        this.snackBar.open(message, 'X', {
            duration: duration,
        });

    }

}