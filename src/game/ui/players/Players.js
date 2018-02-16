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

const playersAsHTML = ({addresses, incomingInvites, outgoingInvites, onClickInvite}) => {
  if (addresses.length) {
    return addresses.map((address, index) => {
      let inviteButton
      if (!outgoingInvites.includes(address) && !incomingInvites.includes(address)) {
        inviteButton = <span className="btn" onClick={() => onClickInvite(address)}>Invite</span>
      }
      return (
        <p key={index}>
          <span className="address">{ address }</span>
          { inviteButton }
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
          <span className="address">{ address }</span>
          <span className="btn" onClick={() => onClickAccept(address)}>Accept</span>
          <span className="btn" onClick={() => onClickReject(address)}>Reject</span>
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
          <span className="address">{ address }</span>
          <span className="btn" onClick={() => onClickCancel(address)}>Cancel</span>
        </p>
      )
    })
  } else {
    return <div>Nothing here...</div>
  }
}

let Players = ({ players, incomingInvites, outgoingInvites, onClickInvite, onClickCancel, onClickAccept, onClickReject }) => {
  let playersHTML = playersAsHTML({ addresses: players, incomingInvites, outgoingInvites, onClickInvite })
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
