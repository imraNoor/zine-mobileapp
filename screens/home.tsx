import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import fontFamily from '../constants/fontFamily';
import LottieView from 'lottie-react-native';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
var header = require('../assets/img/header.png');
var logout = require('../assets/img/logout.png');
var compain = require('../assets/img/compain.png');
var calender = require('../assets/img/calender.png');
var chat = require('../assets/img/chat.png');
var buy = require('../assets/img/buy.png');

const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log('Valu', value);
      return value;
    }
  } catch (e) {
    // error reading value
  }
};
function HomeScreen({navigation, token}) {
  const [visible, isVisible] = useState(false);
  const [loader, isLoader] = useState(true);
  const [uToken, setUToken] = useState('');
  useEffect(() => {
    getData('token').then(userToken => {
      userToken && setUToken(userToken);
    }).finally(()=>{  isLoader(false)});
  }, []);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <ImageBackground
          source={header}
          resizeMode="cover"
          style={styles.image}>
          <View style={styles.profileText}>
            <Text style={styles.userName}>Hi, John Doe</Text>
            <Text style={styles.welcomeText}>Welcome to Our World</Text>
          </View>
          <View style={styles.imgView}>
            <TouchableOpacity onPress={() => isVisible(true)}>
              <Image source={logout} style={styles.logoutImg} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
      <ScrollView style={{flex: 1}} contentContainerStyle={styles.mainContent}>
        <View style={styles.innerView}>
          <TouchableOpacity
            style={styles.commonDiv}
            onPress={() => navigation.navigate('Compain')}>
            <View style={styles.imgDiv}>
              <Image source={compain} style={styles.commonImg} />
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.nameText}>Campaign</Text>
              <Text style={styles.boldText}>Dashboard</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.commonDiv}
            onPress={() => navigation.navigate('Calender')}>
            <View style={styles.imgDiv}>
              <Image source={calender} style={styles.commonImg} />
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.nameText}>View</Text>
              <Text style={styles.boldText}>Calendar</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.innerView}>
          <TouchableOpacity style={styles.commonDiv}>
            <View style={styles.imgDiv}>
              <Image source={chat} style={styles.commonImg} />
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.nameText}>Zine</Text>
              <Text style={styles.boldText}>Chat Room</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.commonDiv}>
            <View style={styles.imgDiv}>
              <Image source={buy} style={styles.commonImg} />
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.nameText}>Buyers</Text>
              <Text style={styles.boldText}>& Sellers</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal visible={visible} animationType="fade" transparent>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#00000088',
          }}>
          {loader ? (
            <LottieView
              source={require('../assets/lf30_editor_dsl3jbcy.json')}
              style={{width: 150, height: 150}}
              autoPlay
              loop
            />
          ) : (
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Do you Want to LogOut?</Text>
              <View style={styles.btnView}>
                <TouchableOpacity style={styles.cancelBtn}>
                  <Text style={styles.cancelText}>No</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelBtn}
                  onPress={() => {
                    isLoader(true);
                    setTimeout(() => {
                      AsyncStorage.removeItem("token");
                      isVisible(false);
                      isLoader(false);
                      navigation.dispatch(
                        CommonActions.reset({
                          index: 0,
                          routes: [
                            { name: 'Spalsh' },
                            
                          ],
                        })
                      );
                    }, 2000);
                  }}>
                  <Text style={styles.cancelText}>Yes</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
}
const mapStateToProps = state => ({
  token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
  loginHandler: (email, pass) => dispatch(adminLogin(email, pass)),
});
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: '30%',
    backgroundColor: '#fff',
  },
  image: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileText: {
    paddingTop: 50,
    paddingLeft: 30,
  },
  logoutImg: {
    width: 20,
    height: 20,
  },
  imgView: {
    paddingTop: 50,
    paddingRight: 30,
  },
  userName: {
    fontSize: 13,
    color: '#fff',
    fontFamily: fontFamily.POPPINS_REGULAR,
  },
  welcomeText: {
    fontSize: 16,
    fontFamily: fontFamily.POPPINS_SEMI,
    color: '#fff',
  },
  commonDiv: {
    height: 180,
    width: '45%',
    borderStyle: 'solid',
    borderWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 15,
    padding: 20,
    borderColor: '#E5E5E5',
  },
  commonImg: {
    width: 80,
    height: 80,
  },
  mainContent: {
    paddingTop: 30,
    paddingRight: 30,
    paddingLeft: 30,
    paddingBottom: 65,
    backgroundColor: '#fff',
  },
  innerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  imgDiv: {
    height: 90,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boldText: {
    fontFamily: fontFamily.POPPINS_SEMI,
    fontSize: 14,
    color: '#253237',
  },
  nameText: {
    fontSize: 12,
    color: '#253237',
    fontFamily: fontFamily.POPPINS_REGULAR,
  },
  modalView: {
    width: '90%',
    backgroundColor: '#fff',
    height: 150,
    borderRadius: 15,
    padding: 20,
  },
  modalTitle: {
    color: '#008DD5',
    textAlign: 'center',
    fontFamily: fontFamily.POPPINS_SEMI,
    fontSize: 16,
  },
  btnView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
  },
  cancelBtn: {
    borderWidth: 1,
    borderStyle: 'solid',
    width: 90,
    height: 30,
    borderColor: '#008DD5',
    borderRadius: 5,
    padding: 5,
  },
  cancelText: {
    textAlign: 'center',
    fontFamily: fontFamily.POPPINS_SEMI,
    color: '#008DD5',
  },
});
