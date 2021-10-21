import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import ACTIONS from '../_redux/actions';
import fontFamily from '../constants/fontFamily';
const header = require('../assets/img/header.png');
const logout = require('../assets/img/logout.png');
const compain = require('../assets/img/compain.png');
const calender = require('../assets/img/calender.png');
const chat = require('../assets/img/chat.png');
const buy = require('../assets/img/buy.png');

function HomeScreen({navigation}: {navigation: any}) {
  const {loggedIn, detail} = useSelector(({USER}) => USER);
  const [visible, isVisible] = useState(false);
  const [loader, isLoader] = useState(true);
  const dispatch = useDispatch();
  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <ImageBackground
          source={header}
          resizeMode="cover"
          style={styles.image}>
          <View style={styles.profileText}>
            <Text style={styles.userName}>Hi, {detail?.name}</Text>
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
          <TouchableOpacity
            style={styles.commonDiv}
            onPress={() => navigation.navigate('Message')}>
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
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Do you Want to LogOut?</Text>
            <View style={styles.btnView}>
              <TouchableOpacity style={styles.cancelBtn}>
                <Text style={styles.cancelText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => {
                  isVisible(false);
                  setTimeout(() => {
                    //AsyncStorage.removeItem('token');
                    // navigation.dispatch(
                    //   CommonActions.reset({
                    //     index: 0,
                    //     routes: [{name: 'Spalsh'}],
                    //   }),
                    // );
                    ACTIONS.letLogout()(dispatch);
                  }, 1000);
                }}>
                <Text style={styles.cancelText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
export default HomeScreen;

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
    paddingTop: 80,
    paddingLeft: 30,
  },
  logoutImg: {
    width: 20,
    height: 20,
  },
  imgView: {
    paddingTop: 100,
    paddingRight: 30,
  },
  userName: {
    fontSize: 17,
    color: '#fff',
    fontFamily: fontFamily.POPPINS_REGULAR,
  },
  welcomeText: {
    fontSize: 22,
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
