import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import { connect } from "react-redux";

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import "./manageDoctor.scss";
import Select from 'react-select';
import { languages, CRUD_ACTION } from "../../../utils/constant";
import { getDetailInforDoctor } from "../../../services/userService";



// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);



class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {

            //save to marldown table
            contentMarkdown: '',
            contentHtml: '',
            selectedOption: {},
            desciption: '',
            allDoctors: [],
            hasOldData: false,

            //save to doctor_infor table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listClinic: [],
            listSpecialty: [],

            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectClinic: '',
            selectSpecialty: '',
            nameClinic: '',
            adressClinic: '',
            note: '',
            clinicId: '',
            specialtyId: '',
        };
    }
    componentDidMount() {
        this.props.getAllDoctor();
        this.props.getRequireDoctorInfor();

    }
    componentDidUpdate(prevProps, prevstate, snapshot) {
        if (prevProps.allDoctors != this.props.allDoctors) {
            let dataSelect = this.builtDataInputSelect(this.props.allDoctors, "USERS");
            this.setState({
                allDoctors: dataSelect,
            })
        }
        if (prevProps.language != this.props.language) {
            let dataSelect = this.builtDataInputSelect(this.props.allDoctors, "USERS");
            let { resPrice, resPayment, resProvince, resPecialty } = this.props.allRequiredDoctorInfor;
            let dataSelectPrice = this.builtDataInputSelect(resPrice, 'PRICE');
            let dataSelectPaymnet = this.builtDataInputSelect(resPayment);
            let dataSelectProvice = this.builtDataInputSelect(resProvince);
            let dataSelectSpecialty = this.builtDataInputSelect(resPecialty, "SPECIALTY");
            console.log("specialty:", dataSelectSpecialty);
            this.setState({
                allDoctors: dataSelect,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPaymnet,
                listProvince: dataSelectProvice,
                listSpecialty: dataSelectSpecialty
            })
        }
        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            let { resPrice, resPayment, resProvince, resPecialty } = this.props.allRequiredDoctorInfor;
            console.log("resPecialty:", resPecialty)
            let dataSelectPrice = this.builtDataInputSelect(resPrice, "PRICE");
            let dataSelectPaymnet = this.builtDataInputSelect(resPayment);
            let dataSelectProvice = this.builtDataInputSelect(resProvince);
            let dataSelectSpecialty = this.builtDataInputSelect(resPecialty, "SPECIALTY");
            console.log("specialtyzzzzz:", dataSelectSpecialty);
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPaymnet,
                listProvince: dataSelectProvice,
                listSpecialty: dataSelectSpecialty
            })
        }
    }

    builtDataInputSelect = (data, type) => {
        let result = [];
        let { language } = this.props;
        if (data && data.length > 0) {
            data.map((item, index) => {

                let object = {};
                let labelVI, labelEN;
                if (type === "PRICE") {
                    labelVI = item.valueVi + "VND";
                    labelEN = item.valueEn + "$";
                }
                if (type === "SPECIALTY") {
                    labelVI = item.name;
                    labelEN = item.name;
                }
                else {
                    labelVI = type === 'USERS' ? `${item.lastName} ${item.firstName}` : item.valueVi;
                    labelEN = type === 'USERS' ? `${item.firstName} ${item.lastName}` : item.valueEn;
                }
                object.label = language === languages.VI ? labelVI : labelEN;
                object.value = type === 'USERS' ? item.id : item.keyMap;
                result.push(object)
            })
        }
        return result;
    }
    // Finish!
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHtml: html,
        })
    }
    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state;
        if (!this.state.selectedPrice) {
            alert("ch??a ch???n gi??");
            return;
        }
        if (!this.state.selectedPayment) {
            alert("ch??a ch???n ph????ng th???c thanh to??n");
            return;
        }
        if (!this.state.selectedProvince) {
            alert("ch??a ch???n T???nh Th??nh");
            return;
        }
        if (!this.state.nameClinic) {
            alert("ch??a ch???n t??n ph??ng kh??m ");
            return;
        }
        if (!this.state.adressClinic) {
            alert("ch??a nh???p ?????a ch??? ph??ng kh??m");
            return;
        }

        this.props.saveInforDoctor({
            contentHTML: this.state.contentHtml,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.desciption,
            doctorId: this.state.selectedOption.value,
            action: hasOldData === true ? CRUD_ACTION.EDIT : CRUD_ACTION.CREATE,
            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            adressClinic: this.state.adressClinic,
            note: this.state.note,
        })
        this.setState({
            hasOldData: true
        })
    }
    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption });
        let { listPayment, listPrice, listProvince } = this.state;
        let res = await (await getDetailInforDoctor(selectedOption.value)).data;
        console.log(' select', res)
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;

            let selectedPrice = "", selectedPayment = "", selectedProvince = "", nameClinic = "", adressClinic = "", note = "";
            console.log('data infor doctor:', res.data.doctorinfor)

            if (res.data.doctorinfor) {
                let sltPrice = res.data.doctorinfor.priceId;
                let sltPayment = res.data.doctorinfor.paymentId;
                let sltProvince = res.data.doctorinfor.provinceId;
                nameClinic = res.data.doctorinfor.nameClinic;
                adressClinic = res.data.doctorinfor.addressClinic;
                note = res.data.doctorinfor.note;
                selectedPrice = listPrice.find(item => {
                    return item && item.value === sltPrice;
                })
                selectedPayment = listPayment.find(item => {
                    return item && item.value === sltPayment;
                })
                selectedProvince = listProvince.find(item => {
                    return item && item.value === sltProvince;
                })
            }
            this.setState({
                contentHtml: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                desciption: markdown.description,
                hasOldData: true,
                selectedPrice: selectedPrice,
                selectedPayment: selectedPayment,
                selectedProvince: selectedProvince,
                nameClinic: nameClinic,
                adressClinic: adressClinic,
                note: note,
            })
        }
        else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                desciption: '',
                hasOldData: false,
            })
        }
    };
    handleOnchangeDesc = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }
    //chang 3 select
    handleChangeSelectDoctorInfor = async (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedOption;
        console.log("selectedOption", selectedOption)
        this.setState({
            ...stateCopy
        })
    }

    render() {
        const { selectedOption } = this.state;
        let { hasOldData } = this.state;
        console.log('specialty:', this.state.listSpecialty)
        // console.log('state:', this, this.state)
        return (
            <div className='manage-doctor-container'>

                <div className="manage-doctor-title"><FormattedMessage id="admin.manage-doctor.title" /></div>
                <div className=" more-infor">
                    <div className="content-left">
                        <label><FormattedMessage id="admin.manage-doctor.intro" /></label>
                        <textarea
                            className="form-control"
                            rows={4} onChange={(event) => { this.handleOnchangeDesc(event, "desciption") }}
                            value={this.state.desciption}
                        />
                    </div>
                    <div className="content-right">
                        <label><FormattedMessage id="admin.manage-doctor.select-doctor" /></label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.allDoctors}
                            placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor" />}
                        />
                    </div>
                </div>
                <div className="more-infor-extra row">
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.price" /></label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPrice}
                            name="selectedPrice"
                        // placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor" />}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.payment" /></label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPayment}
                            name='selectedPayment'
                        // placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor" />}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.Province" /></label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listProvince}
                            name='selectedProvince'
                        // placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor" />}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.name-clinic" /></label>
                        <input className="form-control"
                            onChange={(event) => { this.handleOnchangeDesc(event, "nameClinic") }}
                            value={this.state.nameClinic}
                        >
                        </input>
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.adress-clinic" /></label>
                        <input className="form-control"
                            onChange={(event) => { this.handleOnchangeDesc(event, "adressClinic") }}
                            value={this.state.adressClinic}
                        >
                        </input>
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.note" /></label>
                        <input className="form-control"
                            onChange={(event) => { this.handleOnchangeDesc(event, "note") }}
                            value={this.state.note}
                        >
                        </input>
                    </div>
                    <div className="col-4 form-group">
                        <label>Ch???n chuy??n khoa</label>
                        <Select
                            value={this.state.selectSpecialty}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listSpecialty}
                            name='selectedSpecialty'
                        // placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor" />}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>ch???n ph??ng kh??m</label>
                        <input className="form-control"
                            onChange={(event) => { this.handleOnchangeDesc(event, "adressClinic") }}
                            value={this.state.adressClinic}
                        >
                        </input>
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.note" /></label>
                        <input className="form-control"
                            onChange={(event) => { this.handleOnchangeDesc(event, "note") }}
                            value={this.state.note}
                        >
                        </input>
                    </div>
                </div>
                <div className="manage-doctor-editer">
                    <MdEditor style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown} />
                </div>
                <button
                    type="button"
                    onClick={() => { this.handleSaveContentMarkdown() }}
                    className={hasOldData === true ? "btn  btn-secondary save-infor-doctor" : "btn btn-success save-infor-doctor "}
                >
                    {hasOldData === true ? <FormattedMessage id="admin.manage-doctor.add" /> : <FormattedMessage id="admin.manage-doctor.save" />}
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        saveInforDoctor: (data) => dispatch(actions.saveInforDoctor(data)),
        getRequireDoctorInfor: () => dispatch(actions.getRequireDoctorInfor()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
