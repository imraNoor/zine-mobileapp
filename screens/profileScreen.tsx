import React, {useState, Fragment} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import fontFamily from '../constants/fontFamily';
import Mainheader from '../components/header';
import images from '../constants/images';
import Loader from '../components/loader';
import {showMessage, hideMessage} from 'react-native-flash-message';

function ProfileScreen({navigation}: {navigation: any}) {
  const [showIndicator, isShowIndicator] = useState(false);
  const [done, isDone] = useState(false);
  return (
    <Fragment>
      <Loader visible={showIndicator} done={done} />
      <View style={styles.mainContainer}>
        <Mainheader title="Profile" navigation={navigation} />
        <ScrollView
          contentContainerStyle={{
            paddingBottom: Platform.OS === 'ios' ? 130 : 100,
          }}>
          <View style={styles.mainContent}>
            <View style={[styles.profileView, styles.commonDiv]}>
              <View style={styles.userDetail}>
                <View style={styles.userImgName}>
                  <Image source={images.client} style={styles.clientImg} />
                  <View>
                    <Text style={styles.userName}>John Doe</Text>
                    <Text style={styles.userEmail}>johndoe@gmail.com</Text>
                  </View>
                </View>
                <View>
                  <TouchableOpacity>
                    <Image source={images.edit} style={styles.editIcon} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.underLine}></View>
            <View style={styles.commonDiv}>
              <Text style={styles.mainTitle}>Appointments</Text>
              <View style={styles.multiAppoinment}>
                <View style={styles.commonAppointment}>
                  <Text style={styles.valueAppointment}>00</Text>
                  <Text style={styles.durationAppointment}>To Date</Text>
                </View>
                <View style={styles.commonAppointment}>
                  <Text style={styles.valueAppointment}>00</Text>
                  <Text style={styles.durationAppointment}>To Week</Text>
                </View>
                <View style={styles.commonAppointment}>
                  <Text style={styles.valueAppointment}>00</Text>
                  <Text style={styles.durationAppointment}>To Month</Text>
                </View>
              </View>
            </View>
            <View style={styles.underLine}></View>
            <View style={styles.commonDiv}>
              <Text style={[styles.mainTitle, {marginBottom: 15}]}>
                Edit Profile
              </Text>
              <View style={styles.inputDiv}>
                <TextInput style={styles.inputFiled} placeholder="User Name" />
              </View>
              <View style={styles.inputDiv}>
                <TextInput
                  style={styles.inputFiled}
                  placeholder="Phone Number"
                />
              </View>
              <View style={styles.inputDiv}>
                <TextInput style={styles.inputFiled} placeholder="E-mail" />
              </View>
              <View style={styles.inputDiv}>
                <TextInput
                  style={styles.inputFiled}
                  placeholder="New Password"
                />
              </View>
              <TouchableOpacity
                style={styles.updateBtn}
                onPress={() => {
                  isShowIndicator(true);
                  setTimeout(() => {
                    // isShowIndicator(false);
                    isDone(true);
                    setTimeout(() => {
                      navigation.navigate('Home');
                    }, 2000);
                  }, 5000);
                }}>
                <Text style={styles.updateText}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </Fragment>
  );
}
export default ProfileScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileView: {
    height: '15%',
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
    height: '100%',
  },
  userName: {
    fontFamily: fontFamily.POPPINS_SEMI,
    fontSize: 18,
  },
  userEmail: {
    fontFamily: fontFamily.POPPINS_LIGHT,
    fontSize: 14,
  },
  editIcon: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: -25,
    right: 5,
  },
  userDetail: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
  underLine: {
    height: 4,
    width: '100%',
    backgroundColor: '#F4F4F4',
  },
  mainTitle: {
    fontFamily: fontFamily.POPPINS_SEMI,
    fontSize: 16,
  },
  multiAppoinment: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
  },
  commonAppointment: {
    height: 130,
    backgroundColor: '#008DD5',
    padding: 15,
    width: '33%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: 10,
  },
  valueAppointment: {
    color: '#fff',
    fontSize: 25,
    fontFamily: fontFamily.POPPINS_REGULAR,
  },
  durationAppointment: {
    color: '#fff',
    fontSize: 16,
    fontFamily: fontFamily.POPPINS_REGULAR,
  },
  inputFiled: {
    height: 50,
    width: '100%',
    backgroundColor: '#F6FCFF',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#008DD5',
    borderRadius: 15,
    padding: 10,
    fontFamily: fontFamily.POPPINS_REGULAR,
    fontSize: 14,
  },
  inputDiv: {
    marginBottom: 15,
  },
  updateBtn: {
    height: 50,
    backgroundColor: '#008DD5',
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  updateText: {
    color: '#fff',
    fontFamily: fontFamily.POPPINS_REGULAR,
    fontSize: 15,
  },
});
