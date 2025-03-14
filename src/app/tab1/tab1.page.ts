import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { lastValueFrom } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {

  videos: any[] = [];

  constructor(private apiService: ApiService, private alertController: AlertController) {}

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

  async deleteVideo(videoName: string) {
    try {
      await lastValueFrom(this.apiService.deleteVideo(videoName));
      console.log('Video deleted successfully');
      this.loadVideos(); // Recargar la lista de videos después de eliminar
      this.presentAlert('Video borrado', 'El video se ha borrado correctamente.');
    } catch (error) {
      console.error('Error deleting video', error);
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }
}