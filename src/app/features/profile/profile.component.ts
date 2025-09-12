import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { AuthService } from '@/core/services/auth.service';
import { UserProfile } from '@/shared/models/user.model';

/**
 * Componente de perfil de usuario
 * Permite ver y editar la información del usuario autenticado
 */
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  profileForm: FormGroup;
  userProfile: UserProfile | null = null;
  isSaving = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.profileForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: [''],
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.minLength(6)]],
      confirmPassword: ['']
    }, { validators: this.passwordMatchValidator });
  }

  private passwordMatchValidator(form: any): { [key: string]: any } | null {
    const newPassword = form.get('newPassword');
    const confirmPassword = form.get('confirmPassword');
    
    if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    
    return null;
  }

  private loadUserProfile(): void {
    this.authService.userProfile$
      .pipe(takeUntil(this.destroy$))
      .subscribe(profile => {
        this.userProfile = profile;
        if (profile) {
          this.profileForm.patchValue({
            name: profile.name || '',
            email: profile.email
          });
        }
      });
  }

  getUserInitials(): string {
    if (!this.userProfile) return 'U';
    
    // Si tiene nombre, usar las iniciales del nombre
    if (this.userProfile.name) {
      const nameParts = this.userProfile.name.split(' ');
      if (nameParts.length >= 2) {
        return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
      } else {
        return nameParts[0].substring(0, 2).toUpperCase();
      }
    }
    
    // Si no tiene nombre, usar el email
    if (this.userProfile.email) {
      const email = this.userProfile.email;
      const name = email.split('@')[0];
      return name.substring(0, 2).toUpperCase();
    }
    
    return 'U';
  }

  getMemberSince(): string {
    // Simulated member since date
    return 'Enero 2024';
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.isSaving = true;
      this.errorMessage = '';
      this.successMessage = '';

      // Simulate API call
      setTimeout(() => {
        this.isSaving = false;
        this.successMessage = 'Perfil actualizado exitosamente';
        this.resetForm();
      }, 2000);
    } else {
      this.markFormGroupTouched();
    }
  }

  resetForm(): void {
    this.profileForm.reset();
    this.profileForm.patchValue({
      name: this.userProfile?.name || '',
      email: this.userProfile?.email || ''
    });
    this.successMessage = '';
    this.errorMessage = '';
  }


  private markFormGroupTouched(): void {
    Object.keys(this.profileForm.controls).forEach(key => {
      const control = this.profileForm.get(key);
      control?.markAsTouched();
    });
  }
}
