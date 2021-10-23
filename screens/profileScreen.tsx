import React, {useState, Fragment, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import APIs from '../lib/api';
import Actions from '../_redux/actions';
import fontFamily from '../constants/fontFamily';
import Mainheader from '../components/header';
import images from '../constants/images';
import Loader from '../components/loader';
import ImageTaker from '../components/imageTaker';
function ProfileScreen({navigation}: {navigation: any}) {
  const [showIndicator, isShowIndicator] = useState(false);
  const {detail} = useSelector(({USER}) => USER);
  const dispatch = useDispatch();
  const [done, isDone] = useState(false);
  const [counts, setCounts] = useState({
    weeklyAppointments: 0,
    monthlyAppointments: 0,
    toDateAppointments: 0,
  });
  const [password, setPassword] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [cPasswordErr, setCPasswordErr] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [name, setName] = useState(detail.name);
  const [nameErr, setNameErr] = useState('');
  const [phone, setphone] = useState(
    detail.phone_number ? detail.phone_number : '',
  );
  useEffect(() => {
    APIs.GetAppointmentCounts()
      .then(res => {
        if (res) {
          const {data} = res;
          setCounts(data);
        }
      })
      .finally(() => {});
  }, []);
  const updateInfo = () => {
    if (password && (cPassword !== password || password.length < 8)) {
      password.length < 8 &&
        (setCPasswordErr('Password must be greater then 7 characters'),
        setPasswordErr('Password must be greater then 7 characters'));
      cPassword !== password &&
        setCPasswordErr('confirm Password must match password');
      return false;
    }
    if (name.length < 3) {
      setNameErr('minimum 3 characters');
      return false;
    }
    isShowIndicator(true);
    isDone(false);
    APIs.UpdateInfo(
      password
        ? {name, phone_number: phone, password}
        : {name, phone_number: phone},
    ).finally(() => {
      Actions.letAuthorizeUser({...detail, name, phone_number: phone})(
        dispatch,
      );
      isDone(true);
      setTimeout(() => {
        isShowIndicator(false);
      }, 1000);
    });
  };
  return (
    <Fragment>
      <Loader visible={showIndicator} done={done} />
      <View style={styles.mainContainer}>
        <Mainheader title="Profile" navigation={navigation} />
        <ScrollView
          contentContainerStyle={{
            paddingBottom: Platform.OS === 'ios' ? 130 : 100,
          }}>
          <View style={[styles.profileView, styles.commonDiv]}>
            <View style={styles.userDetail}>
              <View style={styles.userImgName}>
                <ImageTaker
                  photoSetter={
                    ({mime, path}) => {
                      if (path) {
                        const data1 = new FormData();
                        data1.append('image', {
                          uri:
                            Platform.OS === 'ios'
                              ? path.replace('file://', '')
                              : path,
                          type: mime,
                          name: 'user_avatar.jpg',
                        });
                        APIs.UploadImage(data1)
                          .then(res => {
                            if (res) {
                              if (res.success) {
                                const locDetail = {...detail};
                                locDetail.image = res.data;
                                Actions.refreshProfile(locDetail)(dispatch);
                              }
                            }
                            // console.log('res', JSON.stringify(res));
                          })
                          .finally(() => {});
                      }
                    }
                    //console.log('dd', JSON.stringify(e));
                  }>
                  <Image
                    source={
                      detail?.image
                        ? APIs.getServerImage(detail.image)
                        : images.client
                    }
                    style={styles.clientImg}
                  />
                </ImageTaker>
                <View>
                  <Text style={styles.userName}>{detail?.name}</Text>
                  <Text style={styles.userEmail}>{detail?.email}</Text>
                </View>
              </View>
              {/* <View>
                <TouchableOpacity>
                  <Image source={images.edit} style={styles.editIcon} />
                </TouchableOpacity>
              </View> */}
            </View>
          </View>
          <View style={styles.underLine} />
          <View style={styles.commonDiv}>
            <Text style={styles.mainTitle}>Appointments</Text>
            <View style={styles.multiAppoinment}>
              <View style={styles.commonAppointment}>
                <Text style={styles.valueAppointment}>
                  {counts.toDateAppointments}
                </Text>
                <Text style={styles.durationAppointment}>To Date</Text>
              </View>
              <View style={styles.commonAppointment}>
                <Text style={styles.valueAppointment}>
                  {counts.weeklyAppointments}
                </Text>
                <Text style={styles.durationAppointment}>To Week</Text>
              </View>
              <View style={styles.commonAppointment}>
                <Text style={styles.valueAppointment}>
                  {counts.monthlyAppointments}
                </Text>
                <Text style={styles.durationAppointment}>To Month</Text>
              </View>
            </View>
          </View>
          <View style={styles.underLine} />
          <View style={styles.commonDiv}>
            <Text style={[styles.mainTitle, {marginBottom: 15}]}>
              Edit Profile
            </Text>
            <View style={styles.inputDiv}>
              <TextInput
                style={styles.inputFiled}
                placeholder="User Name"
                value={name}
                onChangeText={txt => {
                  setName(txt);
                  nameErr && setNameErr('');
                }}
                placeholderTextColor={'#BBB'}
              />
              {Boolean(nameErr) && (
                <Text style={styles.errorText}>{nameErr}</Text>
              )}
            </View>
            <View style={styles.inputDiv}>
              <TextInput
                style={styles.inputFiled}
                placeholder="Phone Number"
                value={phone}
                keyboardType="name-phone-pad"
                onChangeText={setphone}
                placeholderTextColor={'#BBB'}
              />
            </View>
            <View style={styles.inputDiv}>
              <TextInput
                editable={false}
                style={styles.inputFiled}
                placeholder="E-mail"
                value={detail ? detail.email : ''}
                placeholderTextColor={'#BBB'}
              />
            </View>
            <View style={styles.inputDiv}>
              <TextInput
                value={password}
                onChangeText={txt => {
                  setPassword(txt);
                  passwordErr && setPasswordErr('');
                }}
                secureTextEntry={true}
                style={styles.inputFiled}
                placeholder="New Password"
                placeholderTextColor={'#BBB'}
              />
              {Boolean(passwordErr) && (
                <Text style={styles.errorText}>{passwordErr}</Text>
              )}
            </View>
            <View style={styles.inputDiv}>
              <TextInput
                value={cPassword}
                onChangeText={txt => {
                  setCPassword(txt);
                  cPasswordErr && setCPasswordErr('');
                }}
                secureTextEntry={true}
                style={styles.inputFiled}
                placeholder="Confirm Password"
                placeholderTextColor={'#BBB'}
              />
              {Boolean(cPasswordErr) && (
                <Text style={styles.errorText}>{cPasswordErr}</Text>
              )}
            </View>
            <TouchableOpacity
              style={styles.updateBtn}
              onPress={() => {
                updateInfo();
                // isShowIndicator(true);
                // setTimeout(() => {
                //   // isShowIndicator(false);
                //   isDone(true);
                //   setTimeout(() => {
                //     navigation.navigate('Home');
                //   }, 2000);
                // }, 5000);
              }}>
              <Text style={styles.updateText}>Update</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Fragment>
  );
}
export default ProfileScreen;

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    fontFamily: fontFamily.POPPINS_SEMI,
    fontSize: 10,
  },
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
    borderRadius: 25,
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
    color: '#111',
  },
  userEmail: {
    fontFamily: fontFamily.POPPINS_LIGHT,
    fontSize: 14,
    color: '#111',
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
    color: '#111',
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
