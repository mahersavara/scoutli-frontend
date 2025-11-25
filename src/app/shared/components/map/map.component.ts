import { Component, Input, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';

@Component({
    selector: 'app-map',
    standalone: true,
    imports: [CommonModule],
    template: `<div id="map" style="height: 500px; width: 100%;"></div>`,
    styles: []
})
export class MapComponent implements AfterViewInit, OnChanges {
    @Input() discoveries: any[] = [];
    private map!: L.Map;
    private markers: L.Marker[] = [];

    ngAfterViewInit() {
        this.initMap();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['discoveries'] && this.map) {
            this.updateMarkers();
        }
    }

    private initMap() {
        this.map = L.map('map').setView([21.0285, 105.8542], 13); // Default to Hanoi

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(this.map);

        this.updateMarkers();
    }

    private updateMarkers() {
        // Clear existing markers
        this.markers.forEach(marker => marker.remove());
        this.markers = [];

        // Add new markers
        this.discoveries.forEach(d => {
            if (d.latitude && d.longitude) {
                const marker = L.marker([d.latitude, d.longitude])
                    .bindPopup(`<b>${d.name}</b><br>${d.description}`)
                    .addTo(this.map);
                this.markers.push(marker);
            }
        });
    }
}
