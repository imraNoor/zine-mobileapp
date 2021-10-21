import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import fontFamily from '../../constants/fontFamily';
import {connect} from 'react-redux';
import {adminLogin} from '../../redux/action/authAction';
import Loader from '../../components/loader';
import checkEmail from '../../lib/utilts/checkEmail';
import images from '../../constants/images';
import Hook from '../../lib/hook';

var logo = require('../../assets/img/Logo2.png');
var mail = require('../../assets/img/mail.png');
var lock = require('../../assets/img/lock.png');

function SignIn({navigation, loginHandler}) {
  const [kbHeight] = Hook.useKeyboard();
  const [showIndicator, isShowIndicator] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShow, setPasswordShow] = useState(false);
  const [done, isDone] = useState(false);
  const [emailErr, setEmailErr] = useState('');
  const [passErr, setPassErr] = useState('');

  const postSignInHandler = () => {
    let checkerEmail = checkEmail(email);
    let checkerPasword = checkPassword(password);

    checkerEmail
      ? checkerPasword &&
        (isShowIndicator(true),
        loginHandler(email, password).then(res => {
          if (res) {
            if (res.error) {
              Alert.alert(res.error);
              isShowIndicator(false);
              isDone(false);
            } else {
              isDone(true);
              setTimeout(() => navigation.replace('BottomTab'), 2000);
            }
          }
        }))
      : setEmailErr('Please Enter Your Correct Email !');
  };
  const checkPassword = password => {
    if (password.length > 8) {
      setPassErr('');
      return true;
    } else {
      setPassErr('The password must be at least 8 characters.');
      return false;
    }
  };
  const showPassword = passwordShow => {
    setPasswordShow(!passwordShow);
  };
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
          <Text style={styles.titleText}>Sign In</Text>
          <View style={styles.formDiv}>
            <Text style={styles.lableText}>Email</Text>
            <View style={[styles.inputDiv, emailErr && styles.errorFiled]}>
              <View style={styles.imgView}>
                <Image style={styles.inputImg} source={mail} />
              </View>
              <TextInput
                onChangeText={e => {
                  setEmail(e);
                  emailErr && setEmailErr('');
                }}
                value={email}
                style={styles.inputFiled}
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
                onChangeText={e => {
                  setPassword(e);
                  passErr && setPassErr('');
                }}
                value={password}
                style={styles.inputFiled}
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
            <TouchableOpacity style={styles.button}>
              <Text style={styles.lableText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.submitButton}
              // onPress={() => navigation.navigate('BottomTab')}
              onPress={() => postSignInHandler()}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.haveAccount}
              onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.lableText}>Don’t Have an Account?</Text>
            </TouchableOpacity>
          </View>
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
  loginHandler: (email, pass) => dispatch(adminLogin(email, pass)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

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
    flex: 1
  },
  logoBox: {
    height: '40%',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 50,
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
    paddingLeft: 10,
    fontFamily: fontFamily.POPPINS_REGULAR,
  },
  formDiv: {
    marginTop: 20,
  },
  inputFiled: {
    width: '70%',
    fontFamily: fontFamily.POPPINS_REGULAR,
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
