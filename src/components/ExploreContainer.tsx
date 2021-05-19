import {IonContent, IonHeader, IonTitle, IonToolbar, IonSlides, IonSlide, IonButton} from '@ionic/react';
import React from 'react';

const slideOpts = {
    initialSlide: 0,
    speed: 400
};

class Home extends React.Component<any, any> {

    private _slidesRef = React.createRef<any>();

    constructor(props: any) {
        super(props);
        this.state = {
            slides: [
                '1 Slide',
                '2 Slide',
            ]
        };
    }

    onSlidesAdd() {
        this.setState({
            slides: [
                '1 Slide',
                '2 Slide',

                '3 Slide',
                '4 Slide',
                '5 Slide'
            ]
        }, async () => {
            await this._slidesRef.current.update();
            console.log('IonSlides updated, but issue persists');
        });
    }

    render() {
        const {slides} = this.state;

        return (
            <>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Ionic Blank</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>

                    <IonButton onClick={() => this.onSlidesAdd()}>
                        Add slides
                    </IonButton>

                    <IonSlides ref={this._slidesRef} pager={true} options={slideOpts}>
                        {slides.map((slide: any) => (
                            <IonSlide key={parseInt(slide)}>
                                <h1>{slide}</h1>
                            </IonSlide>
                        ))}
                    </IonSlides>
                </IonContent>
            </>
        );
    }
}

export default Home;