import React, {useState, Fragment, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Stars from 'react-native-stars';
import fontFamily from '../constants/fontFamily';
import Mainheader from '../components/header';
import Loader from '../components/loader';
import images from '../constants/images';
import {monthArr} from '../lib/utilts';
import APIs from '../lib/api';
function AppointmentScreen({navigation, route}: {navigation: any; route: any}) {
  const {item} = route.params;
  const [showIndicator, isShowIndicator] = useState(false);
  const [comment, setComment] = useState('');
  const [starUpdate, isStarUpdate] = useState(0);
  const [done, isDone] = useState(false);
  const [dataToShow, setData] = useState(item);
  useEffect(() => {
    APIs.GetAppointmentDetail(item.id)
      .then(Res => {
        if (Res.success) {
          setData(Res.data[0]);

          isStarUpdate(
            Res.data[0].ratings.length ? Res.data[0].ratings[0].rating : 0,
          );
          setComment(Res.data[0].user_review ? Res.data[0].user_review : '');
          // console.log('Ínfo', Res.data[0].ratings[0].rating);
          // console.log('Ínfo', Res.data[0].user_review);
        }
      })
      .finally(() => {});
  }, []);
  const SubmitReview = () => {
    isShowIndicator(true);
    APIs.GiveReview({id: item.id, rate: starUpdate, user_review: comment})
      .then(() => {})
      .finally(() => {
        setTimeout(() => {
          isShowIndicator(false);
          isDone(true);
          setTimeout(() => {
            navigation.goBack();
          }, 2000);
        }, 1000);
      });
  };

  const [date, time] = dataToShow.date_time.split(' ');
  const splitedTime = time.split(':');
  const splitedDate = date.split('-');
  return (
    <Fragment>
      <View style={styles.mainContainer}>
        <Loader visible={showIndicator} done={done} />
        <Mainheader title="Appointment" navigation={navigation} />
        <ScrollView contentContainerStyle={{paddingBottom: 100, padding: 20}}>
          <View>
            <View style={[styles.profileView, styles.commonDiv]}>
              <View style={styles.userDetail}>
                <View style={styles.userImgName}>
                  <View>
                    <Text style={styles.userName}>{dataToShow.type}</Text>
                    <Text style={styles.userEmail}>
                      Time: {splitedTime[0]}:{splitedTime[2]}
                    </Text>
                  </View>
                </View>
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.dateText}>{splitedDate[2]}</Text>
                  <Text style={styles.dateText}>
                    {monthArr[splitedDate[1]]}
                  </Text>
                </View>
              </View>
              <Text style={styles.trainingText}>{dataToShow.comments}</Text>
            </View>
          </View>
          <View style={styles.ratingView}>
            <Text style={styles.mainTitle}>Satisfaction</Text>
            <Stars
              disabled={Boolean(dataToShow.ratings?.length)}
              half={true}
              default={starUpdate}
              spacing={10}
              count={5}
              starSize={35}
              fullStar={images.fullStar}
              halfStar={images.halfStar}
              emptyStar={images.emptyStar}
              update={(val: any) => isStarUpdate(val)}
            />
            <TextInput
              style={styles.inputFiled}
              value={comment}
              editable={!Boolean(dataToShow.ratings?.length)}
              onChangeText={setComment}
              placeholder="comment"
              placeholderTextColor={'#bbb'}
            />
            {!Boolean(dataToShow.ratings?.length) && (
              <TouchableOpacity style={styles.submitBtn} onPress={SubmitReview}>
                <Text style={styles.submitText}>Submit</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </View>
    </Fragment>
  );
}
export default AppointmentScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  commonDiv: {
    backgroundColor: '#fff',
    padding: 20,
  },
  clientImg: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  userImgName: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  profileView: {
    marginBottom: 20,
  },
  userName: {
    fontFamily: fontFamily.POPPINS_SEMI,
    fontSize: 14,
    color: '#111',
  },
  userEmail: {
    fontFamily: fontFamily.POPPINS_LIGHT,
    fontSize: 12,
    color: '#111',
  },
  trainingText: {
    fontFamily: fontFamily.POPPINS_REGULAR,
    fontSize: 12,
    color: '#111',
  },
  userDetail: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainTitle: {
    fontFamily: fontFamily.POPPINS_SEMI,
    fontSize: 16,
    color: '#111',
  },
  dateText: {
    fontSize: 20,
    color: '#008DD5',
    fontFamily: fontFamily.POPPINS_REGULAR,
  },
  ratingView: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  inputFiled: {
    height: 160,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 15,
    borderColor: '#008DD5',
    marginVertical: 20,
    padding: 10,
    textAlignVertical: 'top',
    fontFamily: fontFamily.POPPINS_REGULAR,
    fontSize: 14,
    color: '#111',
  },
  submitBtn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    color: '#fff',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 15,
    borderColor: '#008DD5',
  },
  submitText: {
    color: '#008DD5',
    fontFamily: fontFamily.POPPINS_SEMI,
    fontSize: 18,
  },
});
