import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

type Filter = 'ativas' | 'resolvidas' | 'todas';
interface Exception { id: number; title: string; description: string; status: 'ativa' | 'resolvida'; }
@Component({ selector: 'app-root', imports: [FormsModule], templateUrl: './app.html' })
export class App {
  readonly filter = signal<Filter>('ativas');
  readonly exceptions = signal<Exception[]>([]);
  readonly visible = computed(() => this.exceptions().filter(item => this.filter() === 'todas' || (this.filter() === 'ativas' ? item.status === 'ativa' : item.status === 'resolvida')));
  readonly activeCount = computed(() => this.exceptions().filter(item => item.status === 'ativa').length);
  readonly modal = signal(false);
  readonly menuOpen = signal(false);
  title = ''; description = ''; submitted = false;
  setFilter(value: string) { if (value === 'ativas' || value === 'resolvidas' || value === 'todas') this.filter.set(value); }
  openModal() { this.title = ''; this.description = ''; this.submitted = false; this.modal.set(true); }
  save() {
    this.submitted = true;
    if (!this.title.trim() || !this.description.trim()) return;
    this.exceptions.update(items => [{ id: Date.now(), title: this.title.trim(), description: this.description.trim(), status: 'ativa' }, ...items]);
    this.filter.set('ativas'); this.modal.set(false);
  }
  resolve(id: number) { this.exceptions.update(items => items.map(item => item.id === id ? { ...item, status: 'resolvida' } : item)); }
}
