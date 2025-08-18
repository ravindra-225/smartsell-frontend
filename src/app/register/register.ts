import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})

export class RegisterComponent {
  registerForm: FormGroup;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['SELLER', Validators.required], // Default to SELLER
    });
  }

  onSubmit(): void {
  if (this.registerForm.valid) {
    this.authService.register(this.registerForm.value).subscribe({
      next: (res) => {
        console.log("Register response:", res);

        if (res && res.message === "User registered successfully!") {
          this.router.navigate(['/login']);
        } else {
          this.error = res?.message || "Unexpected response from server.";
        }
      },
      error: (err) => {
        console.error("Register error:", err);
        this.error = err.error?.message || "Registration failed. Please try again.";
      }
    });
  }

  }
}