// TODO: graph x-axis labelling
// TODO: graph against time (+ settings: toggle x: dst or time)
// TODO: clickable marker
// TODO: settings: center map on point updates
// TODO: settings: turn on/off graph
// TODO: settings: floating info
// TODO: help button
// TODO: visitors section

// DOM object containers for all elements of page
var obj = {
    map: ebid('map'),
    popup: {
        panel: ebid('popup'),
        closer: ebid('popup-closer'),
        coords: ebid('cur_coords'),
        track_specific: ebid('popup_track_specific'),
        sender: ebid('cur_sender'),
        time: ebid('cur_timestamp'),
        speed: ebid('cur_speed'),
        ele: ebid('cur_ele'),
        distance: ebid('cur_dst')
    },
    trackInfo: {
        panel: ebid('info_table'),
        name: ebid('track_name'),
        time: ebid('time_at_marker'),
        speed: ebid('speed_at_marker'),
        timeStart: ebid('time_on_start'),
        distance: ebid('dst_travelled'),
        lastRefresh: ebid('last_refresh')
    },
    refresh: {
        panel: ebid('refresh_panel'),
        interval: ebid('refresh_interval'),
        button: ebid('update_btn')
    },
    graph: ebid('height_map_container'),
    // DEPRECATED:
    curInfo: {
        panel: ebid('cur_info_container'),
    }
};

var map = new Tracker(obj);

obj.trackInfo.name.onclick = function(e) {
    if (map.upd.tracks.length < 2) return;
    let strTracks = '';
    map.upd.tracks.forEach(function(t, i) {
        strTracks += '[' + i + '] ' + t.name + '\n';
    });
    let ind = parseInt(prompt('Please, choose one of the following tracks:\n' + strTracks.substr(0, strTracks.length-1)));
    if (!isNaN(ind)) {
        let uid = map.upd.tracks[ind].uid;
        if (uid === map.upd.selectedTrack.uid) return;
        let track = map.upd.tracks.find(x => x.uid === uid);
        if (track) {
            map.reloadTrack(track);
        }
    }
};