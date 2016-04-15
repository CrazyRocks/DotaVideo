var React = require('react-native');
import {styles,colors,fontSize,Icon,size} from './Css';
var {width,height} = size;


import Main from './Main';


var {
    TouchableOpacity,
    Image,
    Text,
    View,
    Animated
    } = React;

const MModal = React.createClass({
    getInitialState: function () {
        return {
            top: new Animated.Value(height)

        }
    },
    componentDidMount: function () {

    },
    componentWillUpdate: function () {
        if (this.props.show) {
            var top = size.height;
        }
        else {
            var top = 0;
        }
        Animated.spring(
            this.state.top,
            {
                toValue: top,
                //duration: 300,
            }
        ).start();
    },


    render: function () {
        //console.log(this.props.show);


        return (

            <Animated.View style={[styles.modalShow,{top:this.state.top,width:size.width}]}>
                <View style={[styles.modalTop,styles.itemCenter]}>
                    <Image style={[styles.modalImage]} source={{uri:'http://wx.wefi.com.cn/images/bulr/Blur_01.jpg'}}></Image>
                    <Text style={[styles.modalText,styles.paddingVertical]}>点击登陆发表评论</Text>
                </View>
                <View style={[styles.modalCenter,styles.borderBottom,styles.fRow]}>
                    <View style={[styles.UViconBox,styles.fRow,styles.UVborderMR]}>
                        <Icon name='ios-chatboxes-outline' size={22} color='#333'/>
                        <Text style={[styles.modalTextIcon]}> 我的留言</Text>
                    </View>

                    <View style={[styles.UViconBox,styles.fRow]}>
                        <Icon name='ios-cloud-download' size={22} color='#333'/>
                        <Text style={[styles.modalTextIcon]}> 我的缓存</Text>
                    </View>
                </View>
                <View style={[styles.modalDown]}>
                    <View style={[styles.heightQ]}><Text style={[styles.modalTextDown]}>我的缓存</Text></View>
                    <View style={[styles.heightQ]}><Text style={[styles.modalTextDown]}>意见反馈</Text></View>
                    <View style={[styles.heightQ]}><Text style={[styles.modalTextDown]}>我要投稿</Text></View>
                </View>

            </Animated.View>
        );

    }
});

/**
 * 全局header
 * 用法  : <Header />
 * @param
 */

const Header = React.createClass({
    getInitialState: function () {
        return {
            title: '每日精选',
        }
    },

    _renderMenu: function () {
        var icon = 'android-menu';
        if (this.props.parent.state.modalShow)
            icon = 'chevron-down';
        return (
            <TouchableOpacity
                style={[styles.items3,styles.itemLeft,styles.paddingHorizontalA]}
                onPress={()=>{this.props.parent.setState({modalShow:!this.props.parent.state.modalShow})}}
            >
                <Icon name={icon} size={23} color='#000'/>
            </TouchableOpacity>
        );
    },

    render: function () {
        var title = this.props.title || this.state.title;
        return (
            <View>
                <View style={[styles.header,styles.bgColor]}>
                    {this._renderMenu()}

                    <View style={[styles.items3,styles.itemCenter]}>
                        <Text style={[styles.headtitle]}>{title}</Text>
                    </View>
                    <View style={[styles.items3,styles.itemRight,styles.paddingHorizontalA]}>
                        <Icon name='ios-eye-outline' size={30} color='#000'/>
                    </View>
                </View>
            </View>
        );
    }
});


/**
 * Footer
 * 用法  : <Footer />
 * @param
 */


const Footer = React.createClass({
    getInitialState: function () {
        return {}
    }
    ,
    _renderText: function (name, router) {
        var textCss = {};
        if (this.props.active == router) {
            textCss = {color: '#000'};
        }


        return <Text style={[styles.footerItemsFont,textCss]}>{name}</Text>;

    },
    _renderItem(){
        var nav = [
            {label: 'list', text: '每日精选'},
            {label: 'users', text: '发现更多'},
            {label: 'list2', text: '热门排行'},
        ];
        return nav.map(function (item, key) {
            var center = key == 1 ? styles.footerItemsCenter : {};
            var params = {title: item.text};
            return (
                <TouchableOpacity
                    key={key}
                    style={[styles.items3,styles.itemCenter,center]}
                    onPress={()=>{Main.goRouter(this,item.label,params)}}
                >
                    {this._renderText(item.text, item.label)}
                </TouchableOpacity>
            );
        }.bind(this));
    },

    render: function () {
        return (
            <View style={[styles.footer,styles.bgColor]}>

                {this._renderItem()}
            </View>
        );
    }
});


/**
 * 全局layout
 * 用法  : <Layout content={content}/>
 * @param  content 中间内容
 */

const Layout = React.createClass({
    componentDidMount: function () {

    },
    render: function () {

        return (
            <View style={styles.container}>
                <Header />

                <View style={[styles.content]}>
                    <ListBox/>
                </View>
                <Footer />

            </View>
        );
    }
});


/**
 * loading 按钮
 * 用法  : <Loading size={40}/>
 * @param  size - 按钮的大小
 */

const Loading = React.createClass({

    render: function () {
        var size = this.props.size || 30;
        return (
            <View style={[styles.itemCenter]}>
                <Icon name='load-d' size={size} color='#000'
                      style={{width:size,height:size,opacity:size*0.01+0.3}}/>
                <Text style={{color:colors.default,fontSize:fontSize.small,marginBottom:10}}>{this.props.text}</Text>
            </View>
        );
    }
});
/**
 * 加载失败提示
 */
const LoadErr = React.createClass({

    render: function () {
        var size = this.props.size || 30;
        return (
            <View style={[styles.itemCenter,{marginTop:height/3}]}>
                <Icon name='eye-disabled' size={size} color='#000'
                      style={{width:size,height:size,opacity:size*0.01+0.3}}/>
                <Text style={{color:colors.default,fontSize:fontSize.h3,marginBottom:10}}>加载失败,点击重试</Text>
            </View>
        );
    }
});


/**
 * 返回按钮
 * 用法  : <BackButton size={40}/>
 * @param  size - 返回按钮的大小
 */
const BackButton = React.createClass({
    getClass: function (size) {
        var backButton = {
            width: size,
            height: size,
            backgroundColor: '#000',
            opacity: 0.5,
            borderRadius: 20,
            //top: height - size - 100,
            //left: 10,
            //position: 'absolute'
        }
        return backButton;
    },

    render: function () {
        var size = this.props.size || width / 9;
        var className = this.getClass(size);

        return (
            <View style={[className,this.props.style]}>
                <Icon
                    name='ios-arrow-left'
                    size={size}
                    color='#fff'
                    style={{width:size,height:size}}/>
            </View>
        );

    }
});


const Style = {
    Header: Header,
    Layout: Layout,
    Footer: Footer,
    Loading: Loading,
    LoadErr: LoadErr,
    MModal: MModal,
    BackButton: BackButton

}
module.exports = Style;
