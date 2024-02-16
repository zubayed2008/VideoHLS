(function () {
    var video = document.querySelector('#player');

    var defaultOptions = {
        quality: {
            default: '720',
            options: ['720']
        },
        controls: [
            'play-large', // The large play button in the center
            'restart', // Restart playback
            'rewind', // Rewind by the seek time (default 10 seconds)
            'play', // Play/pause playback
            'fast-forward', // Fast forward by the seek time (default 10 seconds)
            'progress', // The progress bar and scrubber for playback and buffering
            'current-time', // The current time of playback
            'duration', // The full duration of the media
            'mute', // Toggle mute
            'volume', // Volume control
            'captions', // Toggle captions
            'settings', // Settings menu
            'pip', // Picture-in-picture (currently Safari only)
            'airplay', // Airplay (currently Safari only)
            'download', // Show a download button with a link to either the current source or a custom URL you specify in your options
            'fullscreen', // Toggle fullscreen
        ]
    };
    var player;

    if (Hls.isSupported()) {
        var hls = new Hls();
        hls.loadSource('video/mediaPlayList.m3u8');
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
            // Transform available levels into an array of integers (height values).
            const availableQualities = hls.levels.map((l) => l.height)

            // Add new qualities to option
            defaultOptions.quality = {
                default: availableQualities[0],
                options: availableQualities,
                // this ensures Plyr to use Hls to update quality level
                forced: true,
                onChange: (e) => updateQuality(e),
            }

            defaultOptions.poster = "/image/thumbnail.jpg";
            defaultOptions.previewThumbnails = {
                enabled: true,
                src: "/image/thumbnail.jpg"
            };
            defaultOptions.controls = [
                'play-large', // The large play button in the center
                'restart', // Restart playback
                'rewind', // Rewind by the seek time (default 10 seconds)
                'play', // Play/pause playback
                'fast-forward', // Fast forward by the seek time (default 10 seconds)
                'progress', // The progress bar and scrubber for playback and buffering
                'current-time', // The current time of playback
                'duration', // The full duration of the media
                'mute', // Toggle mute
                'volume', // Volume control
                'captions', // Toggle captions
                'settings', // Settings menu
                'pip', // Picture-in-picture (currently Safari only)
                'airplay', // Airplay (currently Safari only)
                'download', // Show a download button with a link to either the current source or a custom URL you specify in your options
                'fullscreen', // Toggle fullscreen
            ];
            window.hls = hls;
            player = new Plyr(video, defaultOptions);
        });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = 'video/480_out.m3u8';
        player = new Plyr(video, defaultOptions);
    }
    function updateQuality(newQuality) {
        window.hls.levels.forEach((level, levelIndex) => {
            if (level.height === newQuality) {
                console.log("Found quality match with " + newQuality);
                window.hls.currentLevel = levelIndex;
            }
        });
    }

})();