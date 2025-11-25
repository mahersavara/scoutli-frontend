import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscoveryService } from '../../core/services/discovery.service';
import { MapComponent } from '../../shared/components/map/map.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, MapComponent],
    template: `
    <div class="home-container">
      <h1>Discover Hidden Gems</h1>
      <app-map [discoveries]="discoveries"></app-map>
      <div class="discovery-list">
        <div *ngFor="let d of discoveries" class="discovery-card">
          <h3>{{ d.name }}</h3>
          <p>{{ d.description }}</p>
          <small>{{ d.city }}, {{ d.country }}</small>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .home-container { padding: 2rem; }
    .discovery-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1rem; margin-top: 2rem; }
    .discovery-card { border: 1px solid #ddd; padding: 1rem; border-radius: 8px; }
  `]
})
export class HomeComponent implements OnInit {
    discoveries: any[] = [];

    constructor(private discoveryService: DiscoveryService) { }

    ngOnInit() {
        this.discoveryService.getDiscoveries().subscribe(data => {
            this.discoveries = data;
        });
    }
}
