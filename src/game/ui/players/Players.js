import React from 'react'
import { connect } from 'react-redux'
import { sendInvite, cancelInvite, acceptInvite, rejectInvite } from './PlayerActions'

const mapStateToProps = (state) => {
  return {
    players: state.game.players,
    incomingInvites: state.game.incomingInvites,
    outgoingInvites: state.game.outgoingInvites
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onClickInvite(recipient) {
      dispatch(sendInvite(recipient))
    },
    onClickCancel(recipient) {
      dispatch(cancelInvite(recipient))
    },
    onClickAccept(recipient) {
      dispatch(acceptInvite(recipient))
    },
    onClickReject(recipient) {
      dispatch(rejectInvite(recipient))
    }
  }
}

const playersAsHTML = ({addresses, onClickInvite}) => {
  if (addresses.length) {
    return addresses.map((address, index) => {
      return (
        <p key={index}>
          <span>{ address }</span>
          <button onClick={() => onClickInvite(address)}>Invite</button>
        </p>
      )
    })
  } else {
    return <div>Nothing here...</div>
  }
}

const incomingInvitesAsHTML = ({addresses, onClickAccept, onClickReject}) => {
  if (addresses.length) {
    return addresses.map((address, index) => {
      return (
        <p key={index}>
          <span>{ address }</span>
          <button onClick={() => onClickAccept(address)}>Accept</button>
          <button onClick={() => onClickReject(address)}>Reject</button>
        </p>
      )
    })
  } else {
    return <div>Nothing here...</div>
  }
}

const outgoingInvitesAsHTML = ({addresses, onClickCancel}) => {
  if (addresses.length) {
    return addresses.map((address, index) => {
      return (
        <p key={index}>
          <span>{ address }</span>
          <button onClick={() => onClickCancel(address)}>Cancel</button>
        </p>
      )
    })
  } else {
    return <div>Nothing here...</div>
  }
}

let Players = ({ players, incomingInvites, outgoingInvites, onClickInvite, onClickCancel, onClickAccept, onClickReject }) => {
  let playersHTML = playersAsHTML({ addresses: players, onClickInvite })
  let outgoingInvitesHTML = outgoingInvitesAsHTML({ addresses: outgoingInvites, onClickCancel })
  let incomingInvitesHTML = incomingInvitesAsHTML({ addresses: incomingInvites, onClickAccept, onClickReject })
  return(
    <div>
      <h3>Players online:</h3>
      <div>
        { playersHTML }
      </div>
      <h3>Invites sent:</h3>
      <div>
        { outgoingInvitesHTML }
      </div>
      <h3>Invites received:</h3>
      <div>
        { incomingInvitesHTML }
      </div>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Players)
