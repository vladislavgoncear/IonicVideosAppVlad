import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {

  videos: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadVideos();
  }

  async loadVideos() {
    try {
      const response = await lastValueFrom(this.apiService.getVideos());
      console.log('API response:', response); // Verifica la respuesta de la API
      this.videos = response;
      //for each video url add http://localhost:8000
      this.videos.forEach(video => {
        video.url = 'http://localhost:8000' + video.url;
      });

      console.log('videos',this.videos);
    } catch (error) {
      console.error('Error loading videos', error);
    }
  }
}