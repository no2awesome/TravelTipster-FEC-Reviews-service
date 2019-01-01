import React from 'react';
import ReplyUser from '../ReplyUser/ReplyUser.jsx';
import ReplyUserMessage from '../ReplyUserMessage/ReplyUserMessage.jsx';
import User from '../User/User.jsx';
import UserMessage from '../UserMessage/UserMessage.jsx';

export class UserReviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activePage: null,
      currentColumnView: [],
    };

    this.mapColumn = this.mapColumn.bind(this);
    this.userReviewMessages = null;
  }

  componentWillReceiveProps(nextProps) {
    let currentUserReviewColumn = [];
    // Show 5 messages per page from the number clicked on UserReviewPagination
    for (let i = (nextProps.activePage - 1) * 5; i < (nextProps.activePage) * 5; i++) {
      if (nextProps.hotelData[i] === undefined) {
        break;
      } else {
        currentUserReviewColumn.push(nextProps.hotelData[i]);
      }
    }

    this.setState({
      activePage: nextProps.activePage,
      currentColumnView: currentUserReviewColumn
    });
  }

  mapColumn() {
    if (this.state.currentColumnView !== []) {
      this.userReviewMessages = this.state.currentColumnView.map((userMessage, i) => {
        return (
          <div key={i}>
            <div>
              <User
                userName={userMessage.userName}
                userImage={userMessage.userImage}
                hotelName={userMessage.hotelName}
                datePosted={userMessage.datePosted}/>
              <UserMessage
                overAllRating={userMessage.overAllRating}
                title={userMessage.title}
                imageURI={userMessage.imageURI}
                message={userMessage.message}
                dateOfStay={userMessage.dateOfStay}
                travelerType={userMessage.travelerType}
                valueRating={userMessage.valueRating}
                roomRating={userMessage.roomRating}
                locationRating={userMessage.locationRating}
                cleanlinessRating={userMessage.cleanlinessRating}
                serviceRating={userMessage.serviceRating}
                sleepQualityRating={userMessage.sleepQualityRating}/>
            </div>
            <div>
              <ReplyUser
                replierName={userMessage.replierName}
                replierImage={userMessage.replierImage}
                hotelName={userMessage.hotelName}
                position={userMessage.position}
                timeReplied={userMessage.timeReplied}/>
              <ReplyUserMessage
                replyMessage={userMessage.replyMessage}
              />
            </div>
          </div>
        );
      });
    }
  }

  render() {
    this.mapColumn();
    return (
      this.userReviewMessages
    );
  }
}
