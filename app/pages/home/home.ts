import {Component} from "@angular/core";
import {NavController, ModalController} from 'ionic-angular';
import {AddReviewPage} from '../add-review/add-review';
import {Reviews} from '../../providers/reviews/reviews';
 
@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
 
    reviews: any;
 
    constructor(private nav: NavController, private reviewService: Reviews, private modalCtrl: ModalController) {
 
    }
 
    ionViewLoaded(){
 
        this.reviewService.getReviews().then((data) => {
            console.log(data);
            this.reviews = data;
        });
 
    }
 
    addReview(){
 
        let modal = this.modalCtrl.create(AddReviewPage);
 
        modal.onDidDismiss(review => {
            if(review){
                this.reviews.push(review);
                this.reviewService.createReview(review);                
            }
        });
 
        modal.present();
 
    }
 
    deleteReview(review){
 
        //Remove locally
        let index = this.reviews.indexOf(review);
 
        if(index > -1){
          this.reviews.splice(index, 1);
        }       
 
        //Remove from database
        this.reviewService.deleteReview(review._id);
    }
 
}