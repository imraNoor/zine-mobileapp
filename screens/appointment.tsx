import React, {useState, Fragment} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import fontFamily from '../constants/fontFamily';
import Mainheader from '../components/header';
import Loader from '../components/loader';
import Stars from 'react-native-stars';
import images from '../constants/images';

function AppointmentScreen({navigation}: {navigation: any}) {
  const [starUpdate, isStarUpdate] = useState(0);
  const [showIndicator, isShowIndicator] = useState(false);
  const [done, isDone] = useState(false);
  return (
    <Fragment>
      <View style={styles.mainContainer}>
        <Loader visible={showIndicator} done={done} />
        <Mainheader title="Appointment" navigation={navigation} />
        <ScrollView contentContainerStyle={{paddingBottom: 100,padding: 20,}}>
          <View>
            <View style={[styles.profileView, styles.commonDiv]}>
              <View style={styles.userDetail}>
                <View style={styles.userImgName}>
                  <View>
                    <Text style={styles.userName}>Training</Text>
                    <Text style={styles.userEmail}>Time: 11.30 pm</Text>
                  </View>
                </View>
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.dateText}>9</Text>
                  <Text style={styles.dateText}>Oct</Text>
                </View>
              </View>
              <Text style={styles.trainingText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Mimalesuada gravida id vel pellentesque elit. Ullamcorper
                quisnisi, placerat accumsan, nisi, purus.
              </Text>
            </View>
          </View>
          <View style={styles.ratingView}>
            <Text style={styles.mainTitle}>Satisfaction</Text>
            <Stars
              disabled={false}
              half={true}
              default={1.5}
              spacing={10}
              count={5}
              starSize={35}
              fullStar={images.fullStar}
              halfStar={images.halfStar}
              emptyStar={images.emptyStar}
              update={(val: any) => isStarUpdate(val)}
            />
            <TextInput style={styles.inputFiled} />
            <TouchableOpacity
              style={styles.submitBtn}
              onPress={() => {
                isShowIndicator(true);
                setTimeout(() => {
                  // isShowIndicator(false);
                  isDone(true);
                  setTimeout(() => {
                    navigation.goBack();
                  }, 2000);
                }, 5000);
              }}>
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
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
  },
  userEmail: {
    fontFamily: fontFamily.POPPINS_LIGHT,
    fontSize: 12,
  },
  trainingText: {
    fontFamily: fontFamily.POPPINS_REGULAR,
    fontSize: 12,
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
