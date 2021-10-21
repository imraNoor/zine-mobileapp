import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Hook from '../../lib/hook';
import fontFamily from '../../constants/fontFamily';
import {register} from '../../redux/action/authAction';
import Loader from '../../components/loader';
import {connect} from 'react-redux';
import checkEmail from '../../lib/utilts/checkEmail';
import images from '../../constants/images';

var logo = require('../../assets/img/Logo2.png');
var user = require('../../assets/img/user.png');
var phone = require('../../assets/img/phone.png');
var city = require('../../assets/img/city.png');
var mail = require('../../assets/img/mail.png');
var lock = require('../../assets/img/lock.png');

function SignUp({navigation, signUpHandler}) {
  const [kbHeight] = Hook.useKeyboard();
  const [showIndicator, isShowIndicator] = useState(false);
  const [username, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cityName, setCityName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordShow, setPasswordShow] = useState(false);
  const [confPasswordShow, setConfPasswordShow] = useState(false);
  const [done, isDone] = useState(false);
  const [emailErr, setEmailErr] = useState('');
  const [cPassErr, setCPassErr] = useState('');
  const [passErr, setPassErr] = useState('');
  const [nameErr, setNameErr] = useState('');
  const [cityErr, setCityErr] = useState('');
  const [numberErr, setNumbErr] = useState('');

  const postSignUpHandler = () => {
    checkAllfiled(username, cityName, phoneNumber);
    let checkerEmail = checkEmail(email);
    let passwordCorrect = checkPassword(password, confirmPassword);

    checkerEmail
      ? passwordCorrect &&
        (isShowIndicator(true),
        signUpHandler(
          username,
          phoneNumber,
          cityName,
          email,
          password,
          confirmPassword,
        ).then(res => {
          if (res) {
            if (res.success) {
              isDone(true);
              setTimeout(() => navigation.replace('SignIn'), 2000);
            } else {
              isShowIndicator(false);
              console.log(res);
              res.email && setEmailErr(res.email[0]);
              res.c_password && setCPassErr(res.c_password[0]);
              res.password && setPassErr(res.password[0]);
              isShowIndicator(false);
              isDone(false);
            }
          }
        }))
      : setEmailErr('Please Enter Your Correct Email !');
  };
  const checkPassword = (password, confirmPassword) => {
    // console.log(password, confirmPassword);
    let passwordLength = password.length;
    if (passwordLength > 8 && confirmPassword.length > 8) {
      if (password === confirmPassword) {
        setCPassErr('');
        setPassErr('');
        return true;
      } else {
        return false;
      }
    } else setCPassErr('The password must be at least 8 characters.');
    setPassErr('The password must be at least 8 characters.');
    return false;
  };
  const checkAllfiled = (username, cityName, phoneNumber) => {
    const userLength = username.length;
    const phoneLength = phoneNumber.length;
    const cityLength = cityName.length;
    userLength === 0 && setNameErr('Please Enter your Username Carefully !');
    phoneLength === 0 && setNumbErr('Please Enter your Number Carefully !');
    cityLength === 0 && setCityErr('Please Enter your City Carefully !');
  };

  const showPassword = (passwordShow) =>{
    setPasswordShow(!passwordShow)
  }
  const showConfPassword = (password) =>{
    setConfPasswordShow(!password)
  }
  return (
    <View style={styles.mainContainer}>
      <Loader visible={showIndicator} done={done} />
      <LinearGradient
        colors={['#008DD5', '#6FBFE8']}
        style={[
          styles.linearGradient,
          {justifyContent: kbHeight ? 'flex-start' : 'flex-end'},
        ]}>
        {kbHeight == 0 && (
          <View style={styles.logoBox}>
            <Image source={logo} />
          </View>
        )}
        <View
          style={[
            styles.cardBox,
            {
              borderTopLeftRadius: kbHeight ? 0 : 32,
              borderTopRightRadius: kbHeight ? 0 : 32,
            },
          ]}>
          <Text style={styles.titleText}>Create an Account</Text>
          <ScrollView>
            <View style={styles.formDiv}>
              <Text style={styles.lableText}>User Name</Text>
              <View style={[styles.inputDiv, nameErr && styles.errorFiled]}>
                <View style={styles.imgView}>
                  <Image style={styles.inputImg} source={user} />
                </View>
                <TextInput
                  style={styles.inputFiled}
                  onChangeText={e => {
                    setUserName(e);
                    nameErr && setNameErr('');
                  }}
                  value={username}
                />
              </View>
              {Boolean(nameErr) && (
                <Text style={styles.errorText}>{nameErr}</Text>
              )}
              <Text style={styles.lableText}>Phone Number</Text>
              <View style={[styles.inputDiv, numberErr && styles.errorFiled]}>
                <View style={styles.imgView}>
                  <Image style={styles.inputImg} source={phone} />
                </View>
                <TextInput
                  style={styles.inputFiled}
                  onChangeText={e => {
                    setPhoneNumber(e);
                    numberErr && setNumbErr('');
                  }}
                  value={phoneNumber}
                  maxLength={11}
                  keyboardType="number-pad"
                />
              </View>
              {Boolean(numberErr) && (
                <Text style={styles.errorText}>{numberErr}</Text>
              )}
              <Text style={styles.lableText}>City</Text>
              <View style={[styles.inputDiv, cityErr && styles.errorFiled]}>
                <View style={styles.imgView}>
                  <Image style={styles.inputImg} source={city} />
                </View>
                <TextInput
                  style={styles.inputFiled}
                  onChangeText={e => {
                    setCityName(e);
                    cityErr && setCityErr('');
                  }}
                  value={city}
                />
              </View>
              {Boolean(cityErr) && (
                <Text style={styles.errorText}>{cityErr}</Text>
              )}
              <Text style={styles.lableText}>E-mail</Text>
              <View style={[styles.inputDiv, emailErr && styles.errorFiled]}>
                <View style={styles.imgView}>
                  <Image style={styles.inputImg} source={mail} />
                </View>
                <TextInput
                  style={styles.inputFiled}
                  onChangeText={e => {
                    setEmail(e);
                    emailErr && setEmailErr('');
                  }}
                  value={email}
                />
              </View>
              {Boolean(emailErr) && (
                <Text style={styles.errorText}>{emailErr}</Text>
              )}
              <Text style={styles.lableText}>Password</Text>
              <View style={[styles.inputDiv, passErr && styles.errorFiled]}>
                <View style={styles.imgView}>
                  <Image style={styles.inputImg} source={lock} />
                </View>
                <TextInput
                  style={styles.inputFiled}
                  onChangeText={e => {
                    setPassword(e);
                    passErr && setPassErr('');
                  }}
                  value={password}
                  secureTextEntry={!passwordShow}
                />
                <View style={styles.imgView}>
                <TouchableOpacity
                  onPress={() => {
                    showPassword(passwordShow);
                  }}>
                  {passwordShow ? (
                    <Image style={styles.inputImg} source={images.unhide} />
                  ) : (
                    <Image style={styles.inputImg} source={images.hide} />
                  )}
                </TouchableOpacity>
              </View>
              </View>
              {Boolean(passErr) && (
                <Text style={styles.errorText}>{passErr}</Text>
              )}
              <Text style={styles.lableText}>Confirm Password</Text>
              <View style={[styles.inputDiv, cPassErr && styles.errorFiled]}>
                <View style={styles.imgView}>
                  <Image style={styles.inputImg} source={lock} />
                </View>
                <TextInput
                  style={styles.inputFiled}
                  onChangeText={e => {
                    setConfirmPassword(e);
                    cPassErr && setCPassErr('');
                  }}
                  value={confirmPassword}
                  secureTextEntry={!confPasswordShow}
                />
                 <View style={styles.imgView}>
                <TouchableOpacity
                  onPress={() => {
                    showConfPassword(confPasswordShow);
                  }}>
                  {confPasswordShow ? (
                    <Image style={styles.inputImg} source={images.unhide} />
                  ) : (
                    <Image style={styles.inputImg} source={images.hide} />
                  )}
                </TouchableOpacity>
              </View>
              </View>
              {Boolean(cPassErr) && (
                <Text style={styles.errorText}>{cPassErr}</Text>
              )}
              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => postSignUpHandler()}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('SignIn')}
                style={styles.haveAccount}>
                <Text style={styles.lableText}>Already have an account</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </LinearGradient>
    </View>
  );
}
const mapStateToProps = state => ({
  isLogin: state.auth.isLogin,
  isLoading: state.app.isLoading,
});

const mapDispatchToProps = dispatch => ({
  signUpHandler: (username, phoneNumber, cityName, email, pass, cpassword) =>
    dispatch(register(username, phoneNumber, cityName, email, pass, cpassword)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
    display: 'flex',
  },
  cardBox: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 20,
    flex: 1,
  },
  logoBox: {
    height: '20%',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
  },
  titleText: {
    textAlign: 'center',
    fontSize: 25,
    lineHeight: 37.5,
    color: '#008DD5',
    fontFamily: fontFamily.POPPINS_BOLD,
  },
  inputDiv: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#008DD5',
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
  },
  imgView: {
    width: '15%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  lableText: {
    fontSize: 14,
    paddingLeft: 10,
    fontFamily: fontFamily.POPPINS_REGULAR,
  },
  formDiv: {
    marginTop: 20,
  },
  inputFiled: {
    width: '70%',
    fontFamily: fontFamily.POPPINS_REGULAR,
    fontSize: 14,
    color: '#979797',
  },
  submitButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#008DD5',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    borderRadius: 15,
    color: '#fff',
  },
  buttonText: {
    color: '#fff',
    fontFamily: fontFamily.POPPINS_REGULAR,
  },
  haveAccount: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  inputImg: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
  },
  errorFiled: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontFamily: fontFamily.POPPINS_SEMI,
    fontSize: 10,
  },
});
