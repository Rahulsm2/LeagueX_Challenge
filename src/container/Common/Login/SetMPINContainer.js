import React, { useState, useEffect, useRef } from 'react';
import SetMPINComponent from '../../../screens/Common/Login/SetMPINComponent';
import { useNavigation } from '@react-navigation/core';
import { showToast } from '../../../components/common/ShowToast';
import { persistMpin,getNodeUser } from '../../../services/persistData';
import { CommonActions } from '@react-navigation/native';
import { removeToken, removeMpin, getToken } from '../../../services/persistData';
import { getData, postData } from '../../../services/rootService';
import { connect } from 'react-redux';

const SetMPINContainer = (props) => {
    const [mpin, setMpin] = useState('');
    const [confirmMpin, setConfirmMpin] = useState('');
    const [hideMpin, setHideMpin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const navigation = useNavigation();

    const onClickContinue = async () => {
        if (mpin.length < 4 || mpin !== confirmMpin) {
            message = 'Enter valid MPIN';
            showToast(message);
            return;
        }
        const isPersist = await persistMpin(mpin);
        const nodeUser = await getNodeUser();
        if (isPersist) {
            props.updatenodeuser(JSON.parse(nodeUser))
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        {
                            name: 'ValidatorTabNavigation',
                        },
                    ],
                }),
            );
        }
    }

    return (
        <SetMPINComponent
            onClickContinue={onClickContinue}
            mpin={mpin}
            setMpin={setMpin}
            confirmMpin={confirmMpin}
            setConfirmMpin={setConfirmMpin}
            hideMpin={hideMpin}
            setHideMpin={setHideMpin}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
        />
    );
}

// export default ;
const mapStateToProps = state => ({
    // userData: state.userreducer.userData,
    // sTransactions: state.transactionsreducer.sTransactions,
    // usTransactions: state.transactionsreducer.usTransactions,
    totalAmount: state.transactionsreducer.totalAmount,
    nodeUserData: state.userreducer.nodeUserData
});


const mapDispatchToProps = dispatch => ({
    // updateuser: (userData) => dispatch({ type: 'UPDATE_USERDATA', payload: { userData: userData } }),
    // updatesTransactions: (sTransactions) => dispatch({ type: 'UPDATE_S_TRANSACTIONS', payload: { sTransactions: sTransactions } }),
    // updateusTransactions: (usTransactions) => dispatch({ type: 'UPDATE_US_TRANSACTIONS', payload: { usTransactions: usTransactions } }),
    // updateTotalAmount: (totalAmount) => dispatch({ type: 'UPDATE_TOTAL_AMOUNT', payload: { totalAmount: totalAmount } }),
    updateconfigs: (appConfigs) => dispatch({ type: 'UPDATE_APP_CONFIGS', payload: { appConfigs: appConfigs } }),
    updatenodeuser: (nodeUserData) => dispatch({ type: 'UPDATE_NODE_USERDATA', payload: { nodeUserData: nodeUserData } })

});

export default connect(mapStateToProps, mapDispatchToProps)(SetMPINContainer)